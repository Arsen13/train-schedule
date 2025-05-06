"use client";

import { useRecordStore } from "@/store/recordStore";
import Record from "./Record";
import { useEffect } from "react";
import { ImSortNumbericDesc } from "react-icons/im";
import { ImSortNumericAsc } from "react-icons/im";
import RecordSkeleton from "../skeletons/RecordSkeleton";

export default function Records() {
  const records = useRecordStore((state) => state.records);
  const getRecords = useRecordStore((state) => state.getRecords);
  const deleteRecord = useRecordStore((state) => state.deleteRecord);

  useEffect(() => {
    getRecords();
  }, [getRecords]);

  return (
    <div className="w-full border-2 px-5 py-2">
      <div className="relative">
        <p className="text-center text-2xl mb-3">Train Schedule</p>
        <div className="absolute flex gap-24 top-1.5 right-24">
          <ImSortNumericAsc
            onClick={() => getRecords(undefined, "asc")}
            className="w-6 h-6 cursor-pointer"
          />
          <ImSortNumbericDesc
            onClick={() => getRecords(undefined, "desc")}
            className="w-6 h-6 cursor-pointer"
          />
        </div>
      </div>
      {records.length <= 0 ? (
        <RecordSkeleton />
      ) : (
        records.map((record) => (
          <Record
            key={record.id}
            id={record.id}
            trainNumber={record.trainNumber}
            railwayNumber={record.railwayNumber}
            departureStation={record.departureStation}
            arrivalStation={record.arrivalStation}
            departureTime={record.departureTime}
            arrivalTime={record.arrivalTime}
            deleteRecord={deleteRecord}
          />
        ))
      )}
    </div>
  );
}
