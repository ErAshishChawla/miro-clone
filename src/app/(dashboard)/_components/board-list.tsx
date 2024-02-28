"use client";
import React from "react";

import EmptySearch from "./empty-search";
import EmptyFavorites from "./empty-favorites";
import EmptyBoards from "./empty-boards";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

function BoardList({ orgId, query }: BoardListProps) {
  const data = []; //Todo: Api Call

  let content: React.ReactNode = null;

  if (!data.length) {
    if (query.search) {
      content = <EmptySearch />;
    } else if (query.favorites) {
      content = <EmptyFavorites />;
    } else {
      content = <EmptyBoards />;
    }
  } else {
  }
  return <div className="flex-1">{content}</div>;
}

export default BoardList;
