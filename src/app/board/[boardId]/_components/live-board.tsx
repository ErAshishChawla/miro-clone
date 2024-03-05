"use client";

import React from "react";
import { notFound } from "next/navigation";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import Loading from "./loading";

import Room from "@/components/room";
import Canvas from "./canvas";

interface LiveBoardProps {
  boardId: string;
}

function LiveBoard({ boardId }: LiveBoardProps) {
  const board = useQuery(api.board.getBoard, {
    id: boardId,
  });

  let content: React.ReactNode = null;

  if (board === undefined) {
    content = null;
  } else {
    if (board === null) {
      notFound();
    } else {
      content = (
        <Room roomId={boardId} fallback={<Loading />}>
          <Canvas />
        </Room>
      );
    }
  }
  return content;
}

export default LiveBoard;
