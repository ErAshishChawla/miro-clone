"use client";

import React from "react";
import { useQuery } from "convex/react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Hint from "@/components/hint";
import { Separator } from "@/components/ui/separator";
import Actions from "@/components/actions";
import { Menu } from "lucide-react";

import { poppinsFont } from "@/lib/fonts";
import { paths } from "@/paths";
import { cn } from "@/lib/utils";
import { api } from "../../../../../convex/_generated/api";
import { useRenameModal } from "@/store/use-rename-modal";

interface InfoProps {
  boardId: string;
}

function Info({ boardId }: InfoProps) {
  const board = useQuery(api.board.getBoard, {
    id: boardId,
  });

  const { onOpen } = useRenameModal();

  let content: React.ReactNode = null;

  if (board === undefined) {
    content = <Info.Skeleton />;
  } else {
    if (board === null) {
      notFound();
    } else {
      content = (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
          <Hint label="Go to boards" side="bottom" sideOffset={10}>
            <Button className="px-2" variant={"board"} asChild>
              <Link href={paths.home()}>
                <Image width={40} height={40} alt="Logo" src={"/logo.svg"} />
                <p
                  className={cn(
                    "font-semibold text-xl ml-2 text-black truncate",
                    poppinsFont.className
                  )}
                >
                  Board
                </p>
              </Link>
            </Button>
          </Hint>
          <Separator
            orientation="vertical"
            className="h-1/2 bg-neutral-300 mx-1.5"
          />
          <Hint label="Edit title" side="bottom" sideOffset={10}>
            <Button
              className="text-base font-normal px-2"
              variant={"board"}
              onClick={() => {
                onOpen(board._id, board.title);
              }}
            >
              {board.title}
            </Button>
          </Hint>
          <Separator
            orientation="vertical"
            className="h-1/2 bg-neutral-300 mx-1.5"
          />
          <Actions
            id={board._id}
            title={board.title}
            side="bottom"
            sideOffset={10}
          >
            <div>
              <Hint label="Main menu" side="bottom" sideOffset={10}>
                <Button size={"icon"} variant={"board"}>
                  <Menu />
                </Button>
              </Hint>
            </div>
          </Actions>
        </div>
      );
    }
  }
  return content;
}

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md  h-12 flex items-center shadow-md w-[300px]">
      <Skeleton className="h-full w-full bg-muted-foreground" />
    </div>
  );
};

export default Info;
