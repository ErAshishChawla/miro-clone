import { Camera, CanvasMode, CanvasState, Color } from "@/types/canvas";
import { create } from "zustand";

type CanvasStore = {
  canvasState: CanvasState;
  cameraState: Camera;
  lastUsedColor: Color;
  setCanvasState: (newState: CanvasState) => void;
  setCameraState: (newState: Camera) => void;
  setLastUsedColor: (newState: Color) => void;
};

export const useCanvasStore = create<CanvasStore>((set) => {
  return {
    canvasState: {
      mode: CanvasMode.None,
    },
    cameraState: {
      x: 0,
      y: 0,
    },
    lastUsedColor: {
      r: 255,
      g: 255,
      b: 255,
    },
    setCanvasState: (newState: CanvasState) => {
      set({ canvasState: newState });
    },
    setCameraState: (newState: Camera) => {
      set({ cameraState: newState });
    },
    setLastUsedColor: (newState: Color) => {
      set({ lastUsedColor: newState });
    },
  };
});
