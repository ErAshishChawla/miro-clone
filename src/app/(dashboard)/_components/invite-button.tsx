import { Plus } from "lucide-react";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";

function InviteButton() {
  const router = useRouter();

  return (
    <Button
      variant={"outline"}
      onClick={() => {
        router.push(paths.organizationProfile());
      }}
    >
      <Plus className="w-4 h-4 mr-2" />
      Invite Members
    </Button>
  );
}

export default InviteButton;
