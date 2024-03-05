"use client";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { useOthers, useSelf } from "../../../../../liveblocks.config";

function Participants() {
  const self = useSelf();
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      {self.info?.name}
    </div>
  );
}

Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md flex items-center shadow-md w-[100px]">
      <Skeleton className="h-full w-full bg-muted-foreground" />
    </div>
  );
};

export default Participants;
