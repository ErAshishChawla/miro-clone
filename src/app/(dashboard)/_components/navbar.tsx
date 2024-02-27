"use client";

import { UserButton } from "@clerk/nextjs";
import React from "react";
import SearchInput from "./search-input";

function Navbar() {
  return (
    <div className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex-1">
        <SearchInput />
      </div>
      <UserButton />
    </div>
  );
}

export default Navbar;
