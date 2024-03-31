"use client";

import React from "react";
import { useMutation } from "../../../../../liveblocks.config";

import { Kalam } from "next/font/google";
import ContentEdiable, { ContentEditableEvent } from "react-contenteditable";

import { cn, colorToCSS, getContrastingTextColor } from "@/lib/utils";
import { NoteLayer } from "@/types/canvas";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBasedonHeight = height * scaleFactor;
  const fontSizeBasedonWidth = width * scaleFactor;

  return Math.min(maxFontSize, fontSizeBasedonHeight, fontSizeBasedonWidth);
};

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

function Note({ id, layer, onPointerDown, selectionColor }: NoteProps) {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => {
        onPointerDown(e, id);
      }}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor: fill ? colorToCSS(fill) : "#000",
      }}
      className="shadow-md drop-shadow-xl"
    >
      <ContentEdiable
        html={value || ""}
        onChange={handleContentChange}
        className={cn(
          "h-full w-full flex justify-center items-center outline-none",
          font.className
        )}
        style={{
          color: fill ? getContrastingTextColor(fill) : "#000",
          fontSize: `${calculateFontSize(width, height)}px`,
        }}
      />
    </foreignObject>
  );
}

export default Note;
