import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { login } from "./actions/auth";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        //@ts-ignore
        const parsedValues = JSON.parse(credentials.loginva);
        const validatedFields = LoginSchema.safeParse(parsedValues);
        if (!validatedFields.success) {
          return null;
        }
        const { email, password } = validatedFields.data;
        const res = await login({ email, password });
        console.log(res);
        if (!res) return null;

        if (!res.user) {
          return null;
        }
        const user = JSON.parse(res.user);

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
      console.log(session);
      return session;
    },
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;
      console.log(isAuthenticated);
      return isAuthenticated;
    },
  },
} satisfies NextAuthConfig;
