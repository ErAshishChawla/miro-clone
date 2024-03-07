"use client";

import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import Loading from "./loading";

import Room from "@/components/room";
import Canvas from "./canvas";
import { paths } from "@/paths";

interface LiveBoardProps {
  boardId: string;
}

function LiveBoard({ boardId }: LiveBoardProps) {
  const board = useQuery(api.board.getBoard, {
    id: boardId,
  });
  const router = useRouter();

  let content: React.ReactNode = null;

  if (board === undefined) {
    content = null;
  } else {
    if (board === null) {
      toast.error("Board not found");
      router.replace(paths.home());
    } else {
      content = (
        <Room roomId={boardId} fallback={<Loading />}>
          <Canvas boardId={boardId} />
        </Room>
      );
    }
  }
  return content;
}

export default LiveBoard;
