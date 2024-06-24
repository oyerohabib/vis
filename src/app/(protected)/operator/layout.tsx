import { NormalHeader } from "@/components/navbar";
import { OPERATORSideBar } from "@/components/sidebars/operator";
import { SkeletonNavbar } from "@/components/skeltons";
import { Suspense } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OPERATORSideBar />
      <section className="w-full relative  md:pl-[96px] min-[1140px]:pl-[270px] ">
        <Suspense fallback={<SkeletonNavbar />}>
          <NormalHeader />
        </Suspense>
        <div className="flex w-full flex-col h-full relative max-container pt-12 md:pt-0">
          {children}
        </div>
      </section>
    </>
  );
}
