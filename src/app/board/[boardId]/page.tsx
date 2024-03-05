import React from "react";
import { notFound } from "next/navigation";

import LiveBoard from "./_components/live-board";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

function BoardIdPage({ params }: BoardIdPageProps) {
  const boardId = params.boardId;

  if (!boardId) {
    notFound();
  }

  return <LiveBoard boardId={boardId} />;
}

export default BoardIdPage;
