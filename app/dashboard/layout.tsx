import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import PageNavbar from "@/components/dashboard/PageNavbar";
import SideNav from "@/components/dashboard/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <DashboardNavbar />
      <div className="flex flex-grow overflow-hidden">
        <div className="w-full flex-none xl:w-64 h-screen overflow-y-auto">
          <SideNav />
        </div>
        <div className="w-full flex flex-col">
          <PageNavbar />
          <div className="flex-grow bg-lightest-purple w-full h-full paddings xl:overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
