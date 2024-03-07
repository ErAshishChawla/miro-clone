import React from "react";

import Hint from "./hint";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

function UserAvatar({ name, src, fallback, borderColor }: UserAvatarProps) {
  return (
    <Hint label={name || "Teammate"} side="bottom" sideOffset={10}>
      <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
}

export default UserAvatar;
