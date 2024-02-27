"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { SignInButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";

import { paths } from "@/paths";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { poppinsFont } from "@/lib/fonts";

function ClerkPortalNav() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  let content: React.ReactNode = null;

  if (isLoading) {
    content = <div>Spinner</div>;
  } else {
    if (isAuthenticated) {
      content = (
        <Button asChild>
          <Link href={paths.home()}>Dashboard</Link>
        </Button>
      );
    } else {
      content = <SignInButton />;
    }
  }

  return (
    <div className="flex flex-row w-full px-8 py-4 justify-between items-center gap-x-4 border border-b-gray-300">
      <Link href={paths.home()}>
        <div className="flex items-center gap-x-2">
          <Image src={"/logo.svg"} alt="Logo" height={60} width={50} />
          <span className={cn("font-semibold text-2xl", poppinsFont.className)}>
            Board
          </span>
        </div>
      </Link>

      {content}
    </div>
  );
}

export default ClerkPortalNav;
