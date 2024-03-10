import { CanvasMode, CanvasState } from "@/types/canvas";
import { create } from "zustand";

type CanvasStore = {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
};

export const useCanvasStore = create<CanvasStore>((set) => {
  return {
    canvasState: {
      mode: CanvasMode.None,
    },
    setCanvasState: (newState: CanvasState) => {
      set({ canvasState: newState });
    },
  };
});
