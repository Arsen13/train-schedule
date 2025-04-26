"use client";

import { useRecordStore } from "@/store/recordStore";
import { ChangeEvent } from "react";

export default function SearchField() {
  const searchRecords = useRecordStore((state) => state.searchRecords);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    searchRecords(e.target.value);
  };
  return (
    <input
      type="text"
      name="searchField"
      placeholder="Enter arrival station name"
      className="h-8 w-sm border-2 border-amber-100 rounded-md text-sm italic pl-2 placeholder:text-center"
      onChange={handleSearch}
    />
  );
}
