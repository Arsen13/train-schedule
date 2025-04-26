import { API_URL } from "@/constants/api";
import { Record } from "@/lib/types";
import { create } from "zustand";

export type State = {
  records: Record[];
  page: number;
  limit: number;
  maxPageNumber: number;
};

export type Actions = {
  getRecords: (page?: number, sortOrder?: "asc" | "desc") => void;
};

export const useRecordStore = create<State & Actions>()((set, get) => ({
  records: [],
  page: 1,
  limit: 3,
  maxPageNumber: 0,

  getRecords: async (page = get().page, sortOrder = "asc") => {
    try {
      const { limit } = get();

      const response = await fetch(
        `${API_URL}/record/pagination?page=${page}&limit=${limit}&sortOrder=${sortOrder}`,
        { credentials: "include" }
      );

      const data = await response.json();

      if (response.status == 200) {
        set(() => ({ records: data }));
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  },
}));
