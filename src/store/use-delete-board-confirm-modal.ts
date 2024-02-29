import { create } from "zustand";

const defaultValues = { id: "" };

interface IDeleteBoardConfirmModal {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useDeleteBoardConfirmModal = create<IDeleteBoardConfirmModal>(
  (set) => ({
    isOpen: false,
    onOpen: (id: string) => {
      set({
        isOpen: true,
        initialValues: {
          id,
        },
      });
    },
    onClose: () =>
      set({
        isOpen: false,
        initialValues: defaultValues,
      }),
    initialValues: defaultValues,
  })
);
