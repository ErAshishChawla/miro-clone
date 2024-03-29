"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { paths } from "@/paths";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

function NewBoardButton({ orgId, disabled }: NewBoardButtonProps) {
  const { mutate: createBoard, pending } = useApiMutation(
    api.board.createBoard
  );

  const router = useRouter();

  const onClick = async () => {
    try {
      if (!orgId) return;
      const board = await createBoard({
        orgId: orgId,
        title: "Untitled",
      });
      console.log(board);
      toast.success(`Board created`);
      router.push(paths.board(board));
    } catch (error) {
      toast.error(`Failed to create board`);
    }
  };
  return (
    <button
      disabled={disabled || pending}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800",
        "flex flex-col items-center justify-center py-6",
        disabled || (pending && "cursor-not-allowed opacity-75")
      )}
      onClick={onClick}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-xs mt-2 text-white font-light">New Board</p>
    </button>
  );
}

export default NewBoardButton;
