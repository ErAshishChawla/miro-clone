import { Camera } from "@/types/canvas";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ColorHash from "color-hash";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomHexCode() {
  let hexCode = "#";

  for (let i = 0; i < 3; i++) {
    const randomFloat = Math.random() * 256;
    const floredRandom = Math.floor(randomFloat);
    const hexString = floredRandom.toString(16).padStart(2, "0");
    hexCode += hexString;
  }
  return hexCode;
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}
