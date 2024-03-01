"use client";

import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { api } from "@/../convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/useApiMutation";
import { paths } from "@/paths";

function EmptyBoards() {
  const { organization } = useOrganization();
  const { mutate: createBoard, pending } = useApiMutation(
    api.board.createBoard
  );

  const router = useRouter();

  const onClick = async () => {
    try {
      if (!organization) return;
      const board = await createBoard({
        orgId: organization.id,
        title: "Untitled",
      });
      toast.success(`Board created`);
      router.push(paths.board(board));
    } catch (error) {
      toast.error(`Failed to create board`);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={"/note.svg"} height={110} width={110} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button
          size={"lg"}
          onClick={onClick}
          disabled={pending}
          className="disabled:cursor-not-allowed"
        >
          Create a board
        </Button>
      </div>
    </div>
  );
}

export default EmptyBoards;
