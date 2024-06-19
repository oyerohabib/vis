import { DefaultSession } from "next-auth";

interface ExtendedUser extends DefaultSession["user"] {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  verified: boolean;
  accountType: string;
  referralCode?: string;
  createdAt?: Date;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
