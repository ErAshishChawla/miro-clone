"use client";

import React from "react";
import { useMutation } from "../../../../../liveblocks.config";

import { Content, Kalam } from "next/font/google";
import ContentEdiable, { ContentEditableEvent } from "react-contenteditable";

import { cn, colorToCSS } from "@/lib/utils";
import { TextLayer } from "@/types/canvas";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedonHeight = height * scaleFactor;
  const fontSizeBasedonWidth = width * scaleFactor;

  return Math.min(maxFontSize, fontSizeBasedonHeight, fontSizeBasedonWidth);
};

interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

function Text({ id, layer, onPointerDown, selectionColor }: TextProps) {
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
      }}
    >
      <ContentEdiable
        html={value || ""}
        onChange={handleContentChange}
        className={cn(
          "h-full w-full flex justify-center items-center drop-shadow-md outline-none",
          font.className
        )}
        style={{
          color: fill ? colorToCSS(fill) : "#000",
          fontSize: `${calculateFontSize(width, height)}px`,
        }}
      />
    </foreignObject>
  );
}

export default Text;
