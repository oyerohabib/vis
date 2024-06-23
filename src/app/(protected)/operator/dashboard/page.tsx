import { OperatorDashNavBar } from "@/modules/(operator)/dashboard";
import {
  DashBoardNav,
  OrdersPreview,
  NotificationPreview,
} from "@/modules/(user)/dashboard";

const page = () => {
  return (
    <>
      <section className="w-full h-full flex flex-col gap-y-6 min-[1140px]:px-9 px-3 pt-8">
        <OperatorDashNavBar />
        <div className="flex-col  w-full h-full flex-1">
          <NotificationPreview />
        </div>
      </section>
    </>
  );
};

export default page;
