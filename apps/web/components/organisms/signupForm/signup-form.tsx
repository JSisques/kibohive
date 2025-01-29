'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { graphqlClient } from '@/lib/apollo-client';
import { SIGN_UP, checkSubdomain } from '@/lib/graphql/auth/mutations';
import { getCompanyBySubdomain } from '@/lib/graphql/company/query';
import { useRouter } from 'next/navigation';
// Esquemas de validación para cada paso
const step1Schema = z
  .object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

const step2Schema = z
  .object({
    companyAction: z.enum(['create', 'join']),
    subdomain: z
      .string()
      .min(3, 'El subdominio debe tener al menos 3 caracteres')
      .regex(/^[a-zA-Z0-9-]+$/, 'Solo se permiten letras, números y guiones'),
    companyName: z.string().optional(),
  })
  .refine(
    data => {
      if (data.companyAction === 'create' && !data.companyName) {
        return false;
      }
      return true;
    },
    {
      message: 'El nombre de la empresa es requerido',
      path: ['companyName'],
    },
  );

const step3Schema = z
  .object({
    teamAction: z.enum(['create', 'join']),
    teamName: z.string().optional(),
    teamDescription: z.string().optional(),
    selectedTeam: z.string().optional(),
  })
  .refine(
    data => {
      if (data.teamAction === 'create' && (!data.teamName || !data.teamDescription)) {
        return false;
      }
      if (data.teamAction === 'join' && !data.selectedTeam) {
        return false;
      }
      return true;
    },
    {
      message: 'Todos los campos son requeridos',
      path: ['teamName'],
    },
  );

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    step1?: Step1Data;
    step2?: Step2Data;
    step3?: Step3Data;
  }>({});
  const [teams, setTeams] = useState<Array<{ id: string; name: string }>>([]);

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      companyAction: 'create',
    },
  });

  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      teamAction: 'create',
    },
  });

  const onSubmitStep1 = (data: Step1Data) => {
    setFormData(prev => ({ ...prev, step1: data }));
    setCurrentStep(2);
  };

  const onSubmitStep2 = async (data: Step2Data) => {
    try {
      if (data.companyAction === 'create') {
        const { data: subdomainData } = await graphqlClient.query({
          query: checkSubdomain,
          variables: {
            subdomain: data.subdomain,
          },
        });

        if (!subdomainData.isSubdomainAvailable) {
          step2Form.setError('subdomain', {
            type: 'manual',
            message: 'Este subdominio ya está en uso',
          });
          return;
        }
      } else {
        // Si se une a una empresa, cargamos los equipos
        const { data: companyData } = await graphqlClient.query({
          query: getCompanyBySubdomain,
          variables: {
            subdomain: data.subdomain,
          },
        });

        if (!companyData.getCompanyBySubdomain) {
          step2Form.setError('subdomain', {
            type: 'manual',
            message: 'No se encontró la empresa',
          });
          return;
        }

        setTeams(companyData.getCompanyBySubdomain.teams);
      }

      setFormData(prev => ({ ...prev, step2: data }));
      setCurrentStep(3);
    } catch (error) {
      console.error('Error:', error);
      step2Form.setError('subdomain', {
        type: 'manual',
        message: 'Error al verificar el subdominio',
      });
    }
  };

  const onSubmitStep3 = async (data: Step3Data) => {
    setFormData(prev => ({ ...prev, step3: data }));
    // Aquí iría la lógica para enviar los datos al backend
    console.log('Datos completos:', { ...formData, step3: data });

    await graphqlClient.mutate({
      mutation: SIGN_UP,
      variables: {
        input: {
          name: formData.step1?.name,
          email: formData.step1?.email,
          password: formData.step1?.password,
          isNewCompany: formData.step2?.companyAction === 'create',
          companyName: formData.step2?.companyName,
          subdomain: formData.step2?.subdomain,
          teamName: formData.step3?.teamName,
          teamDescription: formData.step3?.teamDescription,
          selectedTeam: formData.step3?.selectedTeam,
        },
      },
    });

    //router.push(`/${formData.step2?.subdomain}`);
    router.push('/');
  };

  const goBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className={cn('space-y-8', className)} {...props}>
      {/* Indicador de progreso */}
      <div className="flex justify-between items-center">
        {[1, 2, 3].map(step => (
          <div key={step} className="flex items-center">
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center border-2',
                currentStep === step
                  ? 'border-primary bg-primary text-primary-foreground'
                  : currentStep > step
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted bg-muted',
              )}
            >
              {currentStep > step ? <Check className="w-5 h-5" /> : <span>{step}</span>}
            </div>
            {step < 3 && <div className={cn('h-1 w-24', currentStep > step ? 'bg-primary' : 'bg-muted')} />}
          </div>
        ))}
      </div>

      {/* Paso 1: Datos personales */}
      {currentStep === 1 && (
        <form onSubmit={step1Form.handleSubmit(onSubmitStep1)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input id="name" {...step1Form.register('name')} placeholder="John Doe" />
            {step1Form.formState.errors.name && <p className="text-sm text-destructive">{step1Form.formState.errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...step1Form.register('email')} placeholder="john@example.com" />
            {step1Form.formState.errors.email && <p className="text-sm text-destructive">{step1Form.formState.errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" {...step1Form.register('password')} />
            {step1Form.formState.errors.password && <p className="text-sm text-destructive">{step1Form.formState.errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <Input id="confirmPassword" type="password" {...step1Form.register('confirmPassword')} />
            {step1Form.formState.errors.confirmPassword && (
              <p className="text-sm text-destructive">{step1Form.formState.errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Siguiente
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      )}

      {/* Paso 2: Empresa */}
      {currentStep === 2 && (
        <form onSubmit={step2Form.handleSubmit(onSubmitStep2)} className="space-y-4">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button
                type="button"
                variant={step2Form.watch('companyAction') === 'create' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => step2Form.setValue('companyAction', 'create')}
              >
                Crear empresa
              </Button>
              <Button
                type="button"
                variant={step2Form.watch('companyAction') === 'join' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => step2Form.setValue('companyAction', 'join')}
              >
                Unirse a empresa
              </Button>
            </div>

            {step2Form.watch('companyAction') === 'create' && (
              <div className="space-y-2">
                <Label htmlFor="companyName">Nombre de la empresa</Label>
                <Input id="companyName" {...step2Form.register('companyName')} placeholder="Mi Empresa" />
                {step2Form.formState.errors.companyName && (
                  <p className="text-sm text-destructive">{step2Form.formState.errors.companyName.message}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="subdomain">Subdominio</Label>
              <div className="flex items-center gap-2">
                <Input id="subdomain" {...step2Form.register('subdomain')} placeholder="mi-empresa" />
                <span className="text-muted-foreground">.kibomanager.com</span>
              </div>
              {step2Form.formState.errors.subdomain && <p className="text-sm text-destructive">{step2Form.formState.errors.subdomain.message}</p>}
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={goBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Atrás
            </Button>
            <Button type="submit" className="flex-1">
              Siguiente
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      )}

      {/* Paso 3: Equipo */}
      {currentStep === 3 && (
        <form onSubmit={step3Form.handleSubmit(onSubmitStep3)} className="space-y-4">
          {formData.step2?.companyAction === 'create' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="teamName">Nombre del equipo</Label>
                <Input id="teamName" {...step3Form.register('teamName')} placeholder="Equipo principal" />
                {step3Form.formState.errors.teamName && <p className="text-sm text-destructive">{step3Form.formState.errors.teamName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamDescription">Descripción del equipo</Label>
                <Input id="teamDescription" {...step3Form.register('teamDescription')} placeholder="Describe el propósito del equipo" />
                {step3Form.formState.errors.teamDescription && (
                  <p className="text-sm text-destructive">{step3Form.formState.errors.teamDescription.message}</p>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="selectedTeam">Selecciona un equipo</Label>
              <Select onValueChange={value => step3Form.setValue('selectedTeam', value)} defaultValue={step3Form.watch('selectedTeam')}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un equipo" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map(team => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {step3Form.formState.errors.selectedTeam && (
                <p className="text-sm text-destructive">{step3Form.formState.errors.selectedTeam.message}</p>
              )}
            </div>
          )}

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={goBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Atrás
            </Button>
            <Button type="submit" className="flex-1">
              Finalizar registro
              <Check className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
