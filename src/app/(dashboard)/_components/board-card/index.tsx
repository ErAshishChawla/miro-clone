"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

import Footer from "./footer";
import Overlay from "./overlay";

import { paths } from "@/paths";
import { useConvexAuth } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

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

  return (
    <Link href={paths.board(id)}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="flex-1 relative bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
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
