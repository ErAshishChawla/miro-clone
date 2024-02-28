"use client";

import React from "react";

import EmptyOrg from "./_components/empty-org";
import BoardList from "./_components/board-list";

import { useOrganization } from "@clerk/nextjs";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

function DashboardPage({ searchParams }: DashboardPageProps) {
  const { isLoaded, organization } = useOrganization();

  let content: React.ReactNode = null;

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    if (!organization) {
      content = <EmptyOrg />;
    } else {
      content = <BoardList orgId={organization.id} query={searchParams} />;
    }
  }
  return <div className="w-full h-full flex flex-col p-6">{content}</div>;
}

export default DashboardPage;
