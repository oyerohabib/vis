import NextAuth from "next-auth";
import authConfig from "./auth.config";
export const BASE_PATH = "/api/auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  ...authConfig,
  basePath: BASE_PATH,
  secret: process.env.NEXT_PUBLIC_SECRET as string,
});
