import React from "react";
import { MainNav } from "@/components/navigation";

import { Suspense } from "react";
import { SkeletonNavbar } from "@/components/skeltons";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<SkeletonNavbar />}>
        <MainNav />
      </Suspense>
      {children}
      {/* <Sub />
      <Footer /> */}
    </>
  );
}
