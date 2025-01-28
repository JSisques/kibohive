import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { gql } from '@apollo/client';
import { getClient } from './apollo-client';

const SignInMutation = gql`
  mutation SignIn($input: SignInDto!) {
    signIn(input: $input) {
      id
      email
      name
    }
  }
`;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const client = getClient();
          const { data } = await client.mutate({
            mutation: SignInMutation,
            variables: {
              input: {
                email: credentials.email,
                password: credentials.password,
              },
            },
          });

          if (data?.signIn) {
            return {
              id: data.signIn.id,
              email: data.signIn.email,
              name: data.signIn.name,
            };
          }

          return null;
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};
