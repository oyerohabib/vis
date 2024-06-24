import { NormalSideBar } from "@/components/sidebars";
import { Suspense } from "react";
import { NormalHeader } from "@/components/navbar";
import { SkeletonNavbar } from "@/components/skeltons";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NormalSideBar />
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
