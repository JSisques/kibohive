import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { gql } from '@apollo/client';
import { graphqlClient } from './apollo-client';
import { SIGN_IN } from './graphql/auth/mutations';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'tu@email.com' },
        password: { label: 'Contraseña', type: 'password' },
        subdomain: { label: 'Subdominio', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !credentials?.subdomain) {
          throw new Error('Por favor, introduce todos los campos requeridos');
        }

        try {
          const { data } = await graphqlClient.mutate({
            mutation: SIGN_IN,
            variables: {
              input: {
                email: credentials.email,
                password: credentials.password,
                subdomain: credentials.subdomain,
              },
            },
          });

          if (data?.signIn) {
            const { user, accessToken } = data.signIn;
            return {
              ...user,
              accessToken,
            } as User & { accessToken: string };
          }

          throw new Error('Credenciales inválidas');
        } catch (error) {
          console.error('Error durante la autenticación:', error);
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
        token.companyRole = user.companyRole;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.companyId = token.companyId as string;
        session.user.companyRole = token.companyRole as string;
        (session as any).accessToken = token.accessToken;
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
