"use client";

import React, { useCallback } from "react";

import { CursorsPresence } from "./cursors-presence";

import { useMutation } from "../../../../../liveblocks.config";

import { pointerEventToCanvasPoint } from "@/lib/utils";

import { useCameraStore } from "@/store/useCameraStore";

function CursorSvg() {
  const { camera, setCamera } = useCameraStore();

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);

      setMyPresence({
        cursor: current,
      });
    },
    []
  );

  const onWheel = useCallback((e: React.WheelEvent) => {
    const newCamera = {
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    };
    setCamera(newCamera);
  }, []);

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  return (
    <svg
      className="h-screen w-screen"
      onWheel={onWheel}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <g>
        <CursorsPresence />
      </g>
    </svg>
  );
}

export default CursorSvg;
