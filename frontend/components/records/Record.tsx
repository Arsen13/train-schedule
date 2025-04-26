import { RxUpdate } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { RecordProps } from "@/lib/types";

export default function Record({
  trainNumber,
  railwayNumber,
  departureStation,
  arrivalStation,
  departureTime,
  arrivalTime,
}: RecordProps) {
  return (
    <div className="flex text-xl text-center items-center justify-between border-b-1 border-emerald-800 text-amber-400 mb-1">
      <p className="w-12">{railwayNumber}</p>
      <p className="w-20">{trainNumber}</p>
      <p className="flex-1 text-center">
        {departureStation} - {arrivalStation}
      </p>
      <p className="w-30">
        {arrivalTime.split("T")[1].split(".000Z")[0].substring(0, 5)}
      </p>
      <p className="w-30">
        {departureTime.split("T")[1].split(".000Z")[0].substring(0, 5)}
      </p>
      <div className="flex gap-2">
        <RxUpdate className="cursor-pointer hover:text-green-500 duration-500" />
        <AiOutlineDelete className="cursor-pointer hover:text-red-500 duration-500" />
      </div>
    </div>
  );
}
