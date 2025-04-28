"use client";

import { CreateRecordSchema } from "@/lib/types";
import { useRecordStore } from "@/store/recordStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

export default function CreateModal() {
  const router = useRouter();

  const createRecord = useRecordStore((state) => state.createRecord);

  const handleCreateRecord = async (formData: FormData) => {
    const result = CreateRecordSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach(
        (issue) => (errorMessage += `${issue.path[0]}: ${issue.message}. \n`)
      );
      toast.error(errorMessage);
      return;
    }

    createRecord(result.data);
    router.back();
  };
  return (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto bg-background/95">
      <div className="relative w-96 rounded-md p-8 shadow-lg">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Create Train Record</h3>
          <div className="mt-2 px-7 py-3">
            <form className="flex flex-col gap-2.5" action={handleCreateRecord}>
              <input
                type="number"
                min={1}
                name="trainNumber"
                placeholder="Train Number"
                className="h-10 w-64 rounded-md border border-gray-400 pl-2 text-sm italic"
              />

              <input
                type="number"
                min={1}
                name="railwayNumber"
                placeholder="Railway Number"
                className="h-10 w-64 rounded-md border border-gray-400 pl-2 text-sm italic"
              />

              <input
                type="text"
                name="departureStation"
                placeholder="Departure Station"
                className="h-10 w-64 rounded-md border border-gray-400 pl-2 text-sm italic"
              />

              <input
                type="text"
                name="arrivalStation"
                placeholder="Arrival Station"
                className="h-10 w-64 rounded-md border border-gray-400 pl-2 text-sm italic"
              />

              <input
                type="datetime-local"
                name="arrivalTime"
                placeholder="Arrival Time"
                className="h-10 w-64 rounded-md border border-gray-400 pl-2 text-sm italic"
              />

              <input
                type="datetime-local"
                name="departureTime"
                placeholder="Departure Time"
                className="h-10 w-64 rounded-md border border-gray-400 pl-2 text-sm italic"
              />

              <button
                type="submit"
                className="text-md mt-6 cursor-pointer rounded-md px-6 py-2 duration-500 hover:bg-amber-600"
              >
                Create
              </button>
            </form>
            <div className="absolute top-2 right-2">
              <IoClose
                onClick={router.back}
                className="h-6 w-6 cursor-pointer duration-500 hover:text-red-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
