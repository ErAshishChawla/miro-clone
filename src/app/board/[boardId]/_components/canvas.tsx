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
import CursorSvg from "./cursor-svg";

interface CanvasProps {
  boardId: string;
}

function Canvas({ boardId }: CanvasProps) {
  const router = useRouter();

  useErrorListener((error) => {
    toast.error("Unauthorized Access");
    router.replace(paths.home());
  });

  return (
    <div className="h-screen w-screen bg-neutral-100 relative touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
      <CursorSvg />
    </div>
  );
}

export default Canvas;
