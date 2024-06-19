import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { nextlogin } from "./actions/auth";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }
        const { email, password } = validatedFields.data;
        const res = await nextlogin({ email, password });

        if (!res.user) {
          return null;
        }
        const user = res.user;
        console.log(user);
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }: any) {
      return { ...account, ...profile, ...user };
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;
      console.log(isAuthenticated);
      return isAuthenticated;
    },
  },
} satisfies NextAuthConfig;
