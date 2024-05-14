import React from "react";

import { Suspense } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Suspense fallback={<SkeletonNavbar />}>
        <Header />
      </Suspense> */}
      {children}
      {/* <Sub />
      <Footer /> */}
    </>
  );
}
