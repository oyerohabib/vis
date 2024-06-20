import { NormalHeader } from "@/components/navbar";
import { OPERATORSideBar } from "@/components/sidebars/operator";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OPERATORSideBar />
      <section className="w-full relative  md:pl-[96px] min-[1140px]:pl-[270px] ">
        <NormalHeader />
        <div className="flex w-full flex-col h-full relative max-container pt-12 md:pt-0">
          {children}
        </div>
      </section>
    </>
  );
}
