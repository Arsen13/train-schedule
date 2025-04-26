"use client";

import { useRecordStore } from "@/store/recordStore";

export default function PaginationButtons() {
  const incrementPage = useRecordStore((state) => state.incrementPage);
  const decrementPage = useRecordStore((state) => state.decrementPage);

  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={decrementPage}
        className="cursor-pointer rounded-md px-2 py-1 text-sm duration-500 hover:bg-amber-600"
      >
        Prev
      </button>
      <button
        onClick={incrementPage}
        className="cursor-pointer rounded-md px-2 py-1 text-sm duration-500 hover:bg-amber-600"
      >
        Next
      </button>
    </div>
  );
}
