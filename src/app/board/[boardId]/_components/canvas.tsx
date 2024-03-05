"use client";

import React from "react";

import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

function Canvas() {
  return (
    <div className="h-screen w-screen bg-neutral-100 relative touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </div>
  );
}

export default Canvas;
