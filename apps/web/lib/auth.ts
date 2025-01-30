import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { gql } from '@apollo/client';
import { graphqlClient } from './apollo-client';
import { SIGN_IN } from './graphql/auth/mutations';
import { useUser } from '@/context/user-context';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'tu@email.com' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Por favor, introduce todos los campos requeridos');
        }

        try {
          const { data } = await graphqlClient.mutate({
            mutation: SIGN_IN,
            variables: {
              input: {
                email: credentials.email,
                password: credentials.password,
              },
            },
          });

          console.log('data', JSON.stringify(data, null, 2));

          if (data?.signIn) {
            const { user, accessToken, companySubdomain } = data.signIn;
            console.log('user', JSON.stringify(user, null, 2));
            return {
              ...user,
              accessToken,
              companySubdomain,
            } as User & { accessToken: string };
          }

          throw new Error('Credenciales inválidas');
        } catch (error) {
          console.error('Error durante la autenticación:', error);
          console.error('Error completo:', {
            message: (error as any).message,
            networkError: (error as any).networkError,
            graphQLErrors: (error as any).graphQLErrors,
            stack: (error as any).stack,
          });
          throw new Error('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = (user as any).accessToken;
        token.companyId = user.companyId;
        token.companySubdomain = user.companySubdomain;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.companyId = token.companyId as string;
        session.user.companyRole = token.companyRole;
        (session as any).accessToken = token.accessToken;
        session.user.companySubdomain = token.companySubdomain;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  secret: process.env.NEXTAUTH_SECRET,
};
