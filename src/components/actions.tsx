"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { toast } from "sonner";
import DeleteBoardConfirmModal from "./modals/delete-board-confirm-modal";

import { Link2, Pencil, Trash2 } from "lucide-react";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

import { paths } from "@/paths";
import { useRenameModal } from "@/store/use-rename-modal";
import { useDeleteBoardConfirmModal } from "@/store/use-delete-board-confirm-modal";

interface ActionsProps {
  children?: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

function Actions({ children, side, sideOffset, id, title }: ActionsProps) {
  const { onOpen: onRenameModalOpen } = useRenameModal();
  const { onOpen: onConfirmModalOpen } = useDeleteBoardConfirmModal();

  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${paths.board(id)}`
      );
      toast.success("Link copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy link to clipboard");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className="w-60"
        onClick={(event) => event.stopPropagation()}
      >
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={() => {
            onRenameModalOpen(id, title);
          }}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>

        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={() => {
            onConfirmModalOpen(id);
          }}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Actions;
