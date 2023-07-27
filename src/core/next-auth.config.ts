import { getUserByEmail } from '@/actions/user';
import { verifyPassword } from '@/utils/password';
import { NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const user = await getUserByEmail(credentials.email);

        if (!user) {
          return null;
        }

        const isPasswordValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return user;
      },
    }),
  ],

  pages: {
    signIn: '/sign-in',
  },
};
