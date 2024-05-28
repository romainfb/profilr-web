import Credentials from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { getUserByEmail } from '@/app/api/auth/auth.service';
import { comparePassword } from '@/lib/password';


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        const user = await getUserByEmail(credentials.email as string);
        if (!user || !comparePassword(credentials.password as string, user.password)) {
          throw new Error('Invalid credentials');
        }
        return user;
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: {
    maxAge: 30 * 24 * 60 * 60 // 30 jours
  }
});