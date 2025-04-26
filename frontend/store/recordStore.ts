import { API_URL } from "@/constants/api";
import { CreateRecordT, Record } from "@/lib/types";
import toast from "react-hot-toast";
import { create } from "zustand";

export type State = {
  records: Record[];
  page: number;
  limit: number;
  maxPageNumber: number;
};

export type Actions = {
  getRecords: (page?: number, sortOrder?: "asc" | "desc") => void;
  incrementPage: () => void;
  decrementPage: () => void;
  createRecord: (data: CreateRecordT) => void;
  deleteRecord: (id: number) => void;
};

export const useRecordStore = create<State & Actions>()((set, get) => ({
  records: [],
  page: 1,
  limit: 8,
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

      const findAll = await fetch(`${API_URL}/record`, {
        credentials: "include",
      });
      const findAllData = await findAll.json();

      if (findAllData.length) {
        const length = Math.ceil(findAllData.length / get().limit);
        set(() => ({ maxPageNumber: length }));
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  },

  incrementPage: () => {
    const currentPage = get().page;
    if (currentPage < get().maxPageNumber) {
      const increment = currentPage + 1;
      set({ page: increment });
      get().getRecords();
    }
  },

  decrementPage: () => {
    const currentPage = get().page;
    if (currentPage > 1) {
      const decrement = currentPage - 1;
      set({ page: decrement });
      get().getRecords();
    }
  },

  createRecord: async (data: CreateRecordT) => {
    try {
      const response = await fetch(`${API_URL}/record`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (responseData.id) {
        if (get().records.length < get().limit) {
          set(() => ({ records: [...get().records, responseData] }));
        }
      }
    } catch (error) {
      console.error("Error with creating record:", error);
    }
  },

  deleteRecord: async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/record/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (data.message == "Record was successfully deleted") {
        get().getRecords();
        toast.success("Record was successfully deleted");
      }
    } catch (error) {
      console.error("Error with delete record:", error);
    }
  },
}));
