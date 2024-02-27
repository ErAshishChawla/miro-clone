import React from "react";

import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import Hint from "@/components/hint";

import { paths } from "@/paths";
import Link from "next/link";

function CreateOrganizationButton() {
  return (
    // <div className="aspect-square">
    //   <Hint
    //     label="Create organization"
    //     side="right"
    //     align="start"
    //     sideOffset={18}
    //   >
    //     <Link
    //       href={paths.CreateOrganization()}
    //       className="bg-white/25 h-full w-full flex items-center justify-center opacity-60 hover:opacity-100 transition rounded-md"
    //     >
    //       <Plus className="text-white" />
    //     </Link>
    //   </Hint>
    // </div>

    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint
            label="Create organization"
            side="right"
            align="start"
            sideOffset={18}
          >
            <button className="bg-white/25 h-full w-full flex items-center justify-center opacity-60 hover:opacity-100 transition rounded-md">
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <CreateOrganization
          routing="virtual"
          afterCreateOrganizationUrl={paths.home()}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CreateOrganizationButton;
