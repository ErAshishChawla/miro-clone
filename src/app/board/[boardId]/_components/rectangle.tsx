import { colorToCSS } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";
import React from "react";

interface RectangeProps {
  layerId: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

function Rectangle({
  layer,
  layerId,
  onPointerDown,
  selectionColor,
}: RectangeProps) {
  const { x, y, width, height, fill } = layer;
  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, layerId)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={fill ? colorToCSS(fill) : "#000"}
      stroke={selectionColor || "tansparent"}
    />
  );
}

export default Rectangle;
