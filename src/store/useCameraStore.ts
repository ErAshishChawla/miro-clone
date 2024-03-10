import { Camera } from "@/types/canvas";
import { create } from "zustand";

type CameraStore = {
  camera: Camera;
  setCamera: (newCamera: Camera) => void;
};

export const useCameraStore = create<CameraStore>((set) => {
  return {
    camera: { x: 0, y: 0 },
    setCamera: (newCamera: Camera) => {
      set({ camera: newCamera });
    },
  };
});
