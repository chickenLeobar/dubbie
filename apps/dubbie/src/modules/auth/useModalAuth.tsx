import create from "zustand";
import { combine } from "zustand/middleware";

export const useModalAuth = create(
  combine(
    {
      open: true,
    },
    (set, get) => ({
      set,
      toggleModal: () =>
        set({
          open: !get().open,
        }),
    })
  )
);
