'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { graphqlClient } from '@/lib/apollo-client';
import { signUp, checkSubdomain, createCompany } from '@/lib/graphql/auth/mutations';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const signUpSchema = z
  .object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string(),
    isNewCompany: z.boolean().optional(),
    companyName: z.string().min(3, 'El nombre de la compañía debe tener al menos 3 caracteres').optional(),
    subdomain: z
      .string()
      .min(3, 'El dominio debe tener al menos 3 caracteres')
      .regex(/^[a-z0-9-]+$/, 'El subdominio solo puede contener letras minúsculas, números y guiones')
      .optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpStep, setSignUpStep] = useState(1);
  const [isNewCompany, setIsNewCompany] = useState<boolean | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(isSignUp ? signUpSchema : loginSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);
    setError('');

    try {
      if (isSignUp) {
        if (signUpStep === 1) {
          setSignUpStep(2);
          setIsLoading(false);
          return;
        }

        if (isNewCompany) {
          // Verificar si el subdominio existe
          try {
            const { data: subdomainData } = await graphqlClient.query({
              query: checkSubdomain,
              variables: {
                subdomain: data.subdomain,
              },
            });

            if (!subdomainData.isSubdomainAvailable) {
              setError('Este dominio ya existe. Por favor, elige otro.');
              return;
            }

            // Crear la compañía
            const { data: companyData } = await graphqlClient.mutate({
              mutation: createCompany,
              variables: {
                input: {
                  name: data.companyName,
                  subdomain: data.subdomain,
                },
              },
            });

            // Registrar el usuario con la compañía creada
            await graphqlClient.mutate({
              mutation: signUp,
              variables: {
                input: {
                  name: data.name,
                  email: data.email,
                  password: data.password,
                  subdomain: data.subdomain,
                  companyName: data.companyName,
                  companyId: companyData.createCompany.id,
                },
              },
            });
          } catch (error) {
            console.error('Error:', error);
            if (error instanceof Error) {
              setError(error.message || 'Error al verificar el dominio o crear la empresa');
            } else {
              setError('Error al verificar el dominio o crear la empresa');
            }
            return;
          }
        } else {
          // Verificar si el subdominio existe
          try {
            const { data: subdomainData } = await graphqlClient.query({
              query: checkSubdomain,
              variables: {
                subdomain: data.subdomain,
              },
            });

            if (subdomainData.isSubdomainAvailable) {
              setError('Este dominio no existe. Por favor, verifica el dominio.');
              return;
            }

            // Registrar el usuario con la compañía existente
            await graphqlClient.mutate({
              mutation: signUp,
              variables: {
                input: {
                  name: data.name,
                  email: data.email,
                  password: data.password,
                  subdomain: data.subdomain,
                  isNewCompany: false,
                },
              },
            });
          } catch (error) {
            console.error('Error:', error);
            if (error instanceof Error) {
              setError(error.message || 'Error al verificar el dominio');
            } else {
              setError('Error al verificar el dominio');
            }
            return;
          }
        }

        router.push('/dashboard');
        return;
      }

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Credenciales inválidas');
        return;
      }

      router.push('/dashboard');
    } catch (error) {
      setError('Ocurrió un error durante el proceso');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSignUp(!isSignUp);
    setSignUpStep(1);
    setError('');
    reset();
  };

  const handleBack = () => {
    if (signUpStep === 2 && isNewCompany !== null) {
      setIsNewCompany(null);
    } else if (signUpStep === 2) {
      setSignUpStep(1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          {isSignUp
            ? signUpStep === 1
              ? 'Crear una cuenta'
              : isNewCompany === null
                ? 'Elige una opción'
                : isNewCompany
                  ? 'Crear nueva empresa'
                  : 'Unirse a una empresa'
            : 'Login to your account'}
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          {isSignUp
            ? signUpStep === 1
              ? 'Introduce tus datos para crear una cuenta'
              : isNewCompany === null
                ? 'Selecciona si quieres crear una nueva empresa o unirte a una existente'
                : isNewCompany
                  ? 'Configura el dominio de tu espacio de trabajo'
                  : 'Introduce el dominio de tu empresa'
            : 'Enter your email below to login to your account'}
        </p>
      </div>
      {error && <div className="text-sm text-red-500 text-center">{error}</div>}
      <div className="grid gap-6">
        {isSignUp && signUpStep === 1 ? (
          <>
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input {...register('name')} id="name" disabled={isLoading} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input {...register('email')} id="email" type="email" placeholder="m@example.com" disabled={isLoading} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input {...register('password')} id="password" type="password" disabled={isLoading} />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirmar Password</Label>
              <Input {...register('confirmPassword')} id="confirmPassword" type="password" disabled={isLoading} />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>
          </>
        ) : isSignUp && signUpStep === 2 && isNewCompany === null ? (
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Button type="button" variant="outline" className="h-32 flex flex-col gap-2" onClick={() => setIsNewCompany(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
                <span>Crear nueva empresa</span>
              </Button>
              <Button type="button" variant="outline" className="h-32 flex flex-col gap-2" onClick={() => setIsNewCompany(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>Unirse a una empresa</span>
              </Button>
            </div>
            <Button type="button" variant="outline" className="w-full" onClick={handleBack}>
              Volver
            </Button>
          </div>
        ) : isSignUp && signUpStep === 2 ? (
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="subdomain">Nombre del dominio</Label>
              <div className="flex items-center gap-2">
                <Input {...register('subdomain')} id="subdomain" placeholder="mi-empresa" disabled={isLoading} />
                <span className="text-sm text-muted-foreground">.kibohive.com</span>
              </div>
              {errors.subdomain && <p className="text-sm text-red-500">{errors.subdomain.message}</p>}
              {isNewCompany && (
                <div className="grid gap-2 mt-4">
                  <Label htmlFor="companyName">Nombre de la empresa</Label>
                  <Input {...register('companyName')} id="companyName" placeholder="Mi Empresa S.L." disabled={isLoading} />
                  {errors.companyName && <p className="text-sm text-red-500">{errors.companyName.message}</p>}
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <Button type="button" variant="outline" className="w-full" onClick={handleBack}>
                Volver
              </Button>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Procesando...' : 'Registrarse'}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input {...register('email')} id="email" type="email" placeholder="m@example.com" disabled={isLoading} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Input {...register('password')} id="password" type="password" disabled={isLoading} />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
          </>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Procesando...' : isSignUp ? 'Siguiente' : 'Login'}
        </Button>
        {!isSignUp && (
          <>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
            <Button type="button" variant="outline" className="w-full" onClick={() => signIn('github')} disabled={isLoading}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.236 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  fill="currentColor"
                />
              </svg>
              Login with GitHub
            </Button>
          </>
        )}
      </div>
      <div className="text-center text-sm">
        {isSignUp ? '¿Ya tienes una cuenta? ' : '¿No tienes una cuenta? '}
        <a href="#" className="underline underline-offset-4" onClick={toggleMode}>
          {isSignUp ? 'Iniciar sesión' : 'Registrarse'}
        </a>
      </div>
    </form>
  );
}
