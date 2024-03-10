import { CanvasMode, CanvasState } from "@/types/canvas";
import { create } from "zustand";

type CanvasStore = {
  state: CanvasState;
  setState: (newState: CanvasState) => void;
};

export const useCanvasStore = create<CanvasStore>((set) => {
  return {
    state: {
      mode: CanvasMode.None,
    },
    setState: (newState: CanvasState) => {
      set({ state: newState });
    },
  };
});
