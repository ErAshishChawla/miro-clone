import React from "react";
import { redirect } from "next/navigation";

import LiveBoard from "./_components/live-board";
import { toast } from "sonner";
import { paths } from "@/paths";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

function BoardIdPage({ params }: BoardIdPageProps) {
  const boardId = params.boardId;

  if (!boardId) {
    toast.error("Invalid board id");
    redirect(paths.home());
  }

  return <LiveBoard boardId={boardId} />;
}

export default BoardIdPage;
