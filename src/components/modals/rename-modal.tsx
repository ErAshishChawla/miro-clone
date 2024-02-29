"use client";

import { FormEventHandler, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { useRenameModal } from "@/store/use-rename-modal";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export default function RenameModal() {
  const { isOpen, onClose, initialValues } = useRenameModal();
  const [title, setTitle] = useState(initialValues.title);

  const { mutate: updateBoard, pending } = useApiMutation(
    api.board.updateBoard
  );

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      await updateBoard({ id: initialValues.id, title });
      toast.success("Board title updated");
      onClose();
    } catch (error) {
      toast.error("Failed to update board title");
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
          <DialogDescription>Enter a new title for the board</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Board title"
          />
          <DialogFooter>
            <DialogClose asChild onClick={onClose}>
              <Button type="button" variant={"outline"}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
