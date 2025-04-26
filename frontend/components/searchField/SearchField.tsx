"use client";

import { ChangeEvent } from "react";

export default function SearchField() {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <input
      type="text"
      name="searchField"
      placeholder="Enter arrival station name"
      className="h-8 w-sm border border-amber-100 rounded-md text-sm italic pl-2"
      onChange={handleSearch}
    />
  );
}
