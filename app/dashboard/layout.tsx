"use client";

import CommunityNavbar from "@/components/community/CommunityNavbar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import PageNavbar from "@/components/dashboard/PageNavbar";
import SideNav from "@/components/dashboard/Sidebar";
import { useBankDetailsStore, useSchoolCodeStore } from "@/store/store";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode);

  const pathname = usePathname();
  return (
    <div className="flex flex-col h-screen">
      <DashboardNavbar />
      <div>
        {schoolCode !== null && (
          <div className="flex xl:hidden">
            <PageNavbar />
          </div>
        )}
      </div>
      <div className="flex flex-grow overflow-hidden">
        {schoolCode !== null && (
          <div className="w-full hidden xl:flex xl:w-56 overflow-y-auto">
            <SideNav />
          </div>
        )}
        <div className="w-full flex flex-col">
          <div>
            {pathname === "/dashboard" && (
              <div className="hidden xl:flex">
                {schoolCode !== null && <PageNavbar />}
              </div>
            )}
          </div>
          <div>
            {pathname === "/dashboard/community" && (
              <div className="hidden xl:flex">
                {schoolCode !== null && <CommunityNavbar />}
              </div>
            )}
          </div>
          <div className="flex-grow bg-lightest-purple w-full h-full paddings overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
