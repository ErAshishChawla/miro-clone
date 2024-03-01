"use client";

import React from "react";

import EmptySearch from "./empty-search";
import EmptyFavorites from "./empty-favorites";
import EmptyBoards from "./empty-boards";
import BoardCard from "./board-card";
import NewBoardButton from "./new-board-button";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

function BoardList({ orgId, query }: BoardListProps) {
  const data = useQuery(api.boards.get, { orgId, ...query });

  let content: React.ReactNode = null;

  if (data === undefined) {
    content = (
      <>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          {Array(5)
            .fill(0)
            .map((_, idx) => {
              return <BoardCard.Skeleton key={idx} />;
            })}
        </div>
      </>
    );
  } else if (!data.length) {
    if (query.search) {
      content = <EmptySearch />;
    } else if (query.favorites) {
      content = <EmptyFavorites />;
    } else {
      content = <EmptyBoards />;
    }
  } else {
    let title = query.favorites ? "Favorite boards" : "Team boards";
    let boardsList: any;
    if (query.favorites) {
      boardsList = data.map((board) => {
        if (board.isFavorite) {
          return (
            <BoardCard
              key={board._id}
              id={board._id}
              createdAt={board._creationTime}
              authorId={board.authorId}
              authorName={board.authorName}
              imageUrl={board.imageUrl}
              isFavorite={board.isFavorite}
              orgId={board.orgId}
              title={board.title}
            />
          );
        }
        return null;
      });
    } else {
      boardsList = data.map((board) => {
        return (
          <BoardCard
            key={board._id}
            id={board._id}
            createdAt={board._creationTime}
            authorId={board.authorId}
            authorName={board.authorName}
            imageUrl={board.imageUrl}
            isFavorite={board.isFavorite}
            orgId={board.orgId}
            title={board.title}
          />
        );
      });
    }
    content = (
      <>
        <h2 className="text-3xl">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} />
          {boardsList}
        </div>
      </>
    );
  }
  return <div className="flex-1">{content}</div>;
}

export default BoardList;
