import Image from "next/image";
import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { paths } from "@/paths";

function EmptyOrg() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={"/elements.svg"} alt="Empty" height={200} width={200} />
      <h2 className="text-2xl font-semibold mt-6">Welcome to Board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <Link href={paths.createOrganization()}>
          <Button size="lg">Create Organization</Button>
        </Link>
      </div>
    </div>
  );
}

export default EmptyOrg;
