import create from "zustand";
import { combine } from "zustand/middleware";

type Pages = "register" | "loguin" | "verify" | "beforeConfirm";
import { IRegister } from "./schemas/register.schema";
export const useAuthStore = create(
  combine(
    {
      page: "loguin" as Pages,
      token: null as null | string,
      modalIsOpen: false,
      preConfirmData: null as null | IRegister,
    },
    (set) => ({
      set: set,
      setPage: (page: Pages) => {
        set({
          page: page,
        });
      },
      setToken: (token: string) => {
        set({ token });
      },
      openModal: (page: Pages) => {
        set({
          page: page,
          modalIsOpen: true,
        });
      },
      closeModal: () => {
        set({
          modalIsOpen: false,
        });
      },
    })
  )
);
