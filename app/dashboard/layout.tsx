import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
// import PageNavbar from "@/components/dashboard/PageNavbar";
import SideNav from "@/components/dashboard/Sidebar";
import dynamic from "next/dynamic";

const PageNavbar = dynamic(
  () => import("../../components/dashboard/PageNavbar"),
  {
    ssr: false,
  }
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <DashboardNavbar />
      <div className="flex xl:hidden">
        <PageNavbar />
      </div>
      <div className="flex flex-grow overflow-hidden">
        <div className="w-full hidden xl:flex xl:w-64 h-screen overflow-y-auto">
          <SideNav />
        </div>
        <div className="w-full flex flex-col">
          <div className="hidden xl:flex">
            <PageNavbar />
          </div>
          <div className="flex-grow bg-lightest-purple w-full h-full paddings overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
