import { OperatorSettingsSideBar } from "@/components/sidebars/operator/settings";
import { SkeletonNavbar } from "@/components/skeltons";
import { Suspense } from "react";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col h-full relative min-[1140px]:px-9 px-3 ">
      <Suspense fallback={<SkeletonNavbar />}>
        <OperatorSettingsSideBar />
      </Suspense>
      <div className="flex flex-col w-full h-full relative md:pl-[200px] py-4">
        {children}
      </div>
    </div>
  );
}
