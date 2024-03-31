"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import SelectionTools from "./selection-tools";

import { useErrorListener } from "../../../../../liveblocks.config";
import { paths } from "@/paths";

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
      <SelectionTools />
      <CursorSvg />
    </div>
  );
}

export default Canvas;
