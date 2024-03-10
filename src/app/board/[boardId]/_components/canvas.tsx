"use client";

import React, { useEffect, useState, useCallback } from "react";
import { notFound, useRouter } from "next/navigation";
import { toast } from "sonner";

import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { CursorsPresence } from "./cursors-presence";

import {
  useErrorListener,
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation,
} from "../../../../../liveblocks.config";
import { paths } from "@/paths";
import { Camera, CanvasMode, CanvasState } from "@/types/canvas";
import { pointerEventToCanvasPoint } from "@/lib/utils";

interface CanvasProps {
  boardId: string;
}

function Canvas({ boardId }: CanvasProps) {
  const router = useRouter();

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

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
    console.log({ x: e.deltaX, y: e.deltaY });
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  useErrorListener((error) => {
    toast.error("Unauthorized Access");
    router.replace(paths.home());
  });

  return (
    <div className="h-screen w-screen bg-neutral-100 relative touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg
        className="h-screen w-screen"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </div>
  );
}

export default Canvas;
