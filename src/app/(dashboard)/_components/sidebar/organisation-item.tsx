"use client";

import React from "react";
import Image from "next/image";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import Hint from "@/components/hint";

interface OrganisationItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

function OrganisationItem({ id, name, imageUrl }: OrganisationItemProps) {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) {
      return;
    }

    setActive({ organization: id });
  };

  return (
    <li className="aspect-square relative">
      <Hint label={name} align="start" side="right" sideOffset={18}>
        <Image
          alt={name || "Organisation name"}
          src={imageUrl}
          onClick={onClick}
          width={25}
          height={25}
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        />
      </Hint>
    </li>
  );
}

export default OrganisationItem;
