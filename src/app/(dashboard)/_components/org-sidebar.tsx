"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

import { poppinsFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { paths } from "@/paths";

function OrgSidebar() {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div className="flex flex-col gap-y-6 pl-5 pt-5 w-full h-full">
      <Link href={""}>
        <div className="flex items-center gap-x-2">
          <Image src={"/logo.svg"} alt="Logo" height={60} width={50} />
          <span className={cn("font-semibold text-2xl", poppinsFont.className)}>
            Board
          </span>
        </div>
      </Link>

      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
        }}
        afterCreateOrganizationUrl={paths.home()}
        createOrganizationMode="navigation"
        createOrganizationUrl={paths.createOrganization()}
      />
      <div className="space-y-1 w-full">
        <Button
          asChild
          size={"lg"}
          className="font-normal justify-start px-2 w-full"
          variant={favorites ? "ghost" : "secondary"}
        >
          <Link href={paths.home()} className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            <p className="truncate">Team boards</p>
          </Link>
        </Button>

        <Button
          asChild
          size={"lg"}
          className="font-normal justify-start px-2 w-full"
          variant={!favorites ? "ghost" : "secondary"}
        >
          <Link
            href={{
              pathname: paths.home(),
              query: { favorites: true },
            }}
            className="flex items-center gap-2"
          >
            <Star className="h-4 w-4" />
            <p className="truncate">Favourite boards</p>
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default OrgSidebar;
