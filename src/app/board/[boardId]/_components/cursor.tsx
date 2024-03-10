"use client";

import React, { memo } from "react";

import { MousePointer2 } from "lucide-react";

import ColorHash from "color-hash";
import { useOther } from "../../../../../liveblocks.config";

interface CursorProps {
  connectionId: number;
}

export const Cursor = memo(function Cursor({ connectionId }: CursorProps) {
  const colorHash = new ColorHash();
  const { info, cursor } = useOther(connectionId, (user) => {
    return { info: user?.info, cursor: user.presence?.cursor };
  });

  const name = info?.name || "Teammate";

  let content: React.ReactNode = null;

  if (!cursor) {
    content = null;
  } else {
    const { x, y } = cursor;
    content = (
      <foreignObject
        style={{
          transform: `translate(${x}px, ${y}px)`,
        }}
        height={50}
        width={name.length * 10 + 24}
        className="relative drop-shadow-md"
      >
        <MousePointer2
          className="w-5 h-5"
          style={{
            fill: colorHash.hex(connectionId.toString()),
            color: colorHash.hex(connectionId.toString()),
          }}
        />
        <div
          className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
          style={{
            backgroundColor: colorHash.hex(connectionId.toString()),
          }}
        >
          {name}
        </div>
      </foreignObject>
    );
  }

  return content;
});

Cursor.displayName = "Cursor";
