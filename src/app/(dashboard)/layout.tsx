import React from "react";

import Sidebar from "./_components/sidebar";
import OrgSidebar from "./_components/org-sidebar";
import Navbar from "./_components/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="h-screen w-screen grid grid-cols-[60px_1fr] grid-rows-1">
      <Sidebar />
      <div className="w-full h-full">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[206px_1fr] gap-x-3 grid-rows-1">
          <div className="w-full h-full hidden lg:block">
            <OrgSidebar />
          </div>
          <div className="w-full h-full flex flex-col">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardLayout;
