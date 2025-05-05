"use client";

import { useRecordStore } from "@/store/recordStore";
import { ChangeEvent, useCallback } from "react";
import { debounce } from "lodash";

export default function SearchField() {
  const searchRecords = useRecordStore((state) => state.searchRecords);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    handleDebounceChange(e.target.value);
  }, []);

  const handleDebounceChange = debounce((value: string) => {
    searchRecords(value);
  }, 350);

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
