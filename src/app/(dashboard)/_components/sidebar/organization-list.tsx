"use client";

import { useOrganizationList } from "@clerk/nextjs";

import React from "react";
import OrganizationItem from "./organization-item";

function OrganizationList() {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  return (
    <ul className="flex flex-col gap-y-4">
      {userMemberships.data?.map((membership) => {
        return (
          <OrganizationItem
            key={membership.organization.id}
            name={membership.organization.name}
            id={membership.organization.id}
            imageUrl={membership.organization.imageUrl}
          />
        );
      })}
    </ul>
  );
}

export default OrganizationList;
