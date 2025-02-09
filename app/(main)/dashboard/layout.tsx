import React from "react";
import OrganizationsSideBar from "./_component/sidebar/orgs-sidebar";
import DashboardSidebar from "./_component/sidebar";
import DashboardTopBar from "./_component/dashboard-top-bar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100dvh]">
      <OrganizationsSideBar />
      <div className="pl-[48px] sm:pl-[60px] h-full">
        <div className="flex h-full">
          <DashboardSidebar />
          <main className="flex-1 h-full flex flex-col">
            <DashboardTopBar />
            <div className="overflow-y-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
