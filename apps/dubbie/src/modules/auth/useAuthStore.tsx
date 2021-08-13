import create from "zustand";
import { combine } from "zustand/middleware";

export const useAuthStore = create(
  combine(
    {
      page: "loguin",
    },
    (set) => ({
      setPage: (page: "register" | "loguin") => {
        console.log(page);
        set({
          page: page,
        });
      },
    })
  )
);
