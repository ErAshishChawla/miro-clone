"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useDeleteBoardConfirmModal } from "@/store/use-delete-board-confirm-modal";

import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";

function DeleteBoardConfirmModal() {
  const { isOpen, onClose, initialValues } = useDeleteBoardConfirmModal();

  const { mutate: removeBoard, pending } = useApiMutation(
    api.board.removeBoard
  );

  const router = useRouter();

  const onDelete = async () => {
    try {
      await removeBoard({ id: initialValues.id });
      toast.success("Board deleted");
      onClose();
      // router.replace(paths.home());
    } catch (error) {
      toast.error("Failed to delete board");
    }
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Board?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete the board and all of its content
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} disabled={pending}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteBoardConfirmModal;
