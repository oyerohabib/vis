type NavbarLinkProps = {
  id?: number;
  link: string;
  label: string;
};

interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  otp?: string | null;
  otpExpires?: Date | null;
  createdAt?: Date | null;
  updatedAt: Date;
  password?: string | null;
  referralCode?: string | null;
  referredById?: number | null;
  referredBy?: User | null;
  referrals: User[];
  verified: boolean;
}

export { NavbarLinkProps, User };
