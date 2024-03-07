"use client";

import React from "react";
import ColorHash from "color-hash";

import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";

import { useOthers, useSelf } from "../../../../../liveblocks.config";
import { generateRandomHexCode } from "@/lib/utils";

const MAX_SHOWN_OTHER_USERS = 1;

function Participants() {
  const otherUsers = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = otherUsers.length > MAX_SHOWN_OTHER_USERS;
  const colorHash = new ColorHash();

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md gap-2">
      {otherUsers.length > 0 &&
        otherUsers.slice(0, MAX_SHOWN_OTHER_USERS).map((user) => {
          const { connectionId, info } = user;

          return (
            <UserAvatar
              key={connectionId}
              name={info?.name}
              src={info?.picture}
              fallback={info?.name?.[0] || "T"}
              borderColor={colorHash.hex(`${connectionId}`)}
            />
          );
        })}

      {currentUser && (
        <UserAvatar
          name={
            currentUser.info?.name ? `${currentUser.info.name} (You)` : "You"
          }
          src={currentUser.info?.picture}
          fallback={currentUser.info?.name?.[0] || "Y"}
          borderColor={generateRandomHexCode()}
        />
      )}

      {hasMoreUsers && (
        <UserAvatar
          name={`${otherUsers.length - MAX_SHOWN_OTHER_USERS} more`}
          fallback={`+${otherUsers.length - MAX_SHOWN_OTHER_USERS}`}
          borderColor={generateRandomHexCode()}
        />
      )}
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
