"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs";

import SearchInput from "./search-input";

import { paths } from "@/paths";
import InviteButton from "./invite-button";

function Navbar() {
  const { organization } = useOrganization();
  return (
    <div className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex flex-1">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "376px",
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
          organizationProfileUrl={paths.organizationProfile()}
          afterLeaveOrganizationUrl={paths.home()}
          organizationProfileMode="navigation"
        />
      </div>
      {organization && <InviteButton />}
      <UserButton
        userProfileMode="navigation"
        userProfileUrl={paths.userProfile()}
      />
    </div>
  );
}

export default Navbar;
