import type { Metadata } from "next";
import "../styles/globals.scss";
import { poppins, workSans } from "@/fonts";
import StateContextProvider from "@/context/StateCtx";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASEURL as string),
  title: {
    default: "OFFICIAL VISCIO",
    template: `%s | VISCIO`,
  },
  description: `Empowering Farmers and Agro-Logistics Providers for Reliable, Affordable, and Predictable Transport Solutions`,
  openGraph: {
    title: "OFFICIAL VISCIO",
    description:
      "Empowering Farmers and Agro-Logistics Providers for Reliable, Affordable, and Predictable Transport Solutions",
    url: process.env.NEXT_PUBLIC_BASEURL,
    siteName: "VISCIO",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "OFFICIAL VISCIO",
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StateContextProvider>
        <body className={`${poppins.className} ${workSans.variable}`}>
          {children}
          <Toaster />
        </body>
      </StateContextProvider>
    </html>
  );
}
