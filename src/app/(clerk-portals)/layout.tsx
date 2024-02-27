import ClerkPortalNav from "@/components/clerk-portal-nav";
import React from "react";

interface ClerkPortalsLayoutProps {
  children: React.ReactNode;
}

function ClerkPortalsLayout({ children }: ClerkPortalsLayoutProps) {
  return (
    <div className="w-screen h-screen flex flex-col ">
      <ClerkPortalNav />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

export default ClerkPortalsLayout;
