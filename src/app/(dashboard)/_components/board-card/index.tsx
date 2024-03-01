"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

import Footer from "./footer";
import Overlay from "./overlay";

import Actions from "@/components/actions";
import { Skeleton } from "@/components/ui/skeleton";

import { MoreHorizontal } from "lucide-react";

import { paths } from "@/paths";
import { useUser } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";

interface BoardCardProps {
  id: string;
  createdAt: number;
  orgId: string;
  title: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
  isFavorite: boolean;
}

function BoardCard({
  id,
  createdAt,
  orgId,
  title,
  authorId,
  authorName,
  imageUrl,
  isFavorite,
}: BoardCardProps) {
  const { user } = useUser();

  const authorLabel = user?.id === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const { mutate: favouriteBoard, pending: favoriteBoardPending } =
    useApiMutation(api.board.favoriteBoard);
  const { mutate: unfavoriteBoard, pending: unfavoriteBoardPending } =
    useApiMutation(api.board.unfavoriteBoard);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await unfavoriteBoard({ boardId: id });
      } else {
        await favouriteBoard({ boardId: id, orgId: orgId });
      }
    } catch (error) {
      if (isFavorite) {
        toast.error("Failed to unfavorite board");
      } else {
        toast.error("Failed to favorite board");
      }
    }
  };

  return (
    <Link href={paths.board(id)}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="flex-1 relative bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={favoriteBoardPending || unfavoriteBoardPending}
        />
      </div>
    </Link>
  );
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg justify-between overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};

export default BoardCard;
