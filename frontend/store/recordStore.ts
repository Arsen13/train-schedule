import {
  deleteWrapper,
  getWrapper,
  postWrapper,
  putWrapper,
} from "@/app/util/fetch";
import { API_URL } from "@/constants/api";
import { RecordT, Record } from "@/lib/types";
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
  createRecord: (data: RecordT) => void;
  updateRecord: (id: string, data: RecordT) => void;
  deleteRecord: (id: number) => void;
  searchRecords: (searchString: string) => void;
};

export const useRecordStore = create<State & Actions>()((set, get) => ({
  records: [],
  page: 1,
  limit: 8,
  maxPageNumber: 0,

  getRecords: async (page = get().page, sortOrder = "asc") => {
    try {
      const { limit } = get();

      const data = await getWrapper(
        `/record/pagination?page=${page}&limit=${limit}&sortOrder=${sortOrder}`
      );

      if (data.length > 0) {
        set(() => ({ records: data }));
      }

      const findAllData = await getWrapper("/record");

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

  createRecord: async (data: RecordT) => {
    try {
      const responseData = await postWrapper("/record", data);
      if (responseData.id) {
        if (get().records.length < get().limit) {
          set(() => ({ records: [...get().records, responseData] }));
        }
        get().getRecords();
        toast.success("Successfully create a record");
      }
    } catch (error) {
      console.error("Error with creating record:", error);
    }
  },

  updateRecord: async (id: string, data: RecordT) => {
    try {
      const responseData = await putWrapper(`/record/${id}`, data);
      if (responseData.id) {
        const updatedRecords = get().records.filter(
          (item) => Number(item.id) != Number(id)
        );
        updatedRecords.push(responseData);
        set(() => ({ records: updatedRecords }));
        toast.success("Record was successfully updated");
      }
    } catch (error) {
      console.error("Error with updating record:", error);
    }
  },

  deleteRecord: async (id: number) => {
    try {
      const data = await deleteWrapper(`record/${id}`);
      if (data.message == "Record was successfully deleted") {
        get().getRecords();
        toast.success("Record was successfully deleted");
      }
    } catch (error) {
      console.error("Error with delete record:", error);
    }
  },

  searchRecords: async (searchString: string) => {
    try {
      if (searchString == "") {
        get().getRecords();
      } else {
        const data = await getWrapper(`record/search/${searchString}`);

        set(() => ({ records: data }));
      }
    } catch (error) {
      console.error("Error in search record:", error);
    }
  },
}));
