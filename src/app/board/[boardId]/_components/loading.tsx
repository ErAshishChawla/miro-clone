"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useErrorListener } from "../../../../../liveblocks.config";

import { Loader } from "lucide-react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

import { toast } from "sonner";
import { paths } from "@/paths";

function Loading() {
  const router = useRouter();

  useErrorListener((error) => {
    toast.error("Unauthorized Access");
    router.replace(paths.home());
  });

  return (
    <main className="h-screen w-screen bg-netural-100 touch-none flex items-center justify-center">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </main>
  );
}

export default Loading;
