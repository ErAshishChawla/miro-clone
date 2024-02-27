"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import qs from "query-string";
import { useDebounceValue } from "usehooks-ts";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState("");

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounceValue(
    searchTerm,
    500
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDebouncedSearchTerm(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: { search: debouncedSearchTerm },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedSearchTerm, router]);
  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full max-w-[516px] pl-9"
        placeholder="Search boards"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchInput;
