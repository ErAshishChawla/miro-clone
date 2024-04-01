"use client";

import React, { memo } from "react";

import { Cursor } from "./cursor";

import {
  useOthersConnectionIds,
  useOthersMapped,
} from "../../../../../liveblocks.config";
import { shallow } from "@liveblocks/client";
import Path from "./path";
import { colorToCSS } from "@/lib/utils";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => {
        return <Cursor key={connectionId} connectionId={connectionId} />;
      })}
    </>
  );
};

function Drafts() {
  const others = useOthersMapped((other) => {
    return {
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    };
  }, shallow);

  return (
    <>
      {others.map(([connectionId, data]) => {
        if (data.pencilDraft) {
          return (
            <Path
              key={connectionId}
              x={0}
              y={0}
              points={data.pencilDraft}
              fill={data.penColor ? colorToCSS(data.penColor) : "#000"}
            />
          );
        }

        return null;
      })}
    </>
  );
}

function CursorPresence() {
  return (
    <>
      <Cursors />
      <Drafts />
    </>
  );
}

export const CursorsPresence = memo(CursorPresence);

CursorsPresence.displayName = "CursorsPresence";
