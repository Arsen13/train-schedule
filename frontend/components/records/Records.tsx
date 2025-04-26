"use client";

import { useRecordStore } from "@/store/recordStore";
import Record from "./Record";
import { useEffect } from "react";

export default function Records() {
  const records = useRecordStore((state) => state.records);
  const getRecords = useRecordStore((state) => state.getRecords);

  useEffect(() => {
    getRecords();
  }, [getRecords]);

  console.log(records);
  return (
    <div className="w-full border-2 px-5 py-2">
      <p className="text-center text-2xl mb-3">Train Schedule</p>
      {records.length <= 0 ? (
        <>Dont have records</>
      ) : (
        records.map((record) => (
          <Record
            key={record.id}
            trainNumber={record.trainNumber}
            railwayNumber={record.railwayNumber}
            departureStation={record.departureStation}
            arrivalStation={record.arrivalStation}
            departureTime={record.departureTime}
            arrivalTime={record.arrivalTime}
          />
        ))
      )}
    </div>
  );
}
