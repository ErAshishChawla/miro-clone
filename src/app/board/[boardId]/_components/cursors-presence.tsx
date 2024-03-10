"use client";

import React, { memo } from "react";

import { Cursor } from "./cursor";

import { useOthersConnectionIds } from "../../../../../liveblocks.config";

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

function CursorPresence() {
  return (
    <>
      <Cursors />
    </>
  );
}

export const CursorsPresence = memo(CursorPresence);

CursorsPresence.displayName = "CursorsPresence";
