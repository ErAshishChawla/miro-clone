"use client";

import React, { useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { toast } from "sonner";

import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

import { useErrorListener, useStatus } from "../../../../../liveblocks.config";
import { paths } from "@/paths";

function Canvas() {
  const router = useRouter();

  useErrorListener((error) => {
    toast.error("Unauthorized Access");
    router.replace(paths.home());
  });

  return (
    <div className="h-screen w-screen bg-neutral-100 relative touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </div>
  );
}

export default Canvas;
