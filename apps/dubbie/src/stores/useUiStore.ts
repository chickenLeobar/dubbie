import create, { SetState, GetState } from "zustand";
import { combine } from "zustand/middleware";

/*=============================================
=            Ui store            =
=============================================*/

export interface State {
  openSearchBar: boolean;
  toogleSearchBar: () => void;
}

const useUiStore = create<State>(
  (set: SetState<State>, get: GetState<State>) => ({
    openSearchBar: false,
    toogleSearchBar: () => {
      set({ openSearchBar: !get().openSearchBar });
    },
  })
);

export const searhBarStateSelector = (state: State) => state.openSearchBar;
export const toggleSearchBar = (state: State) => state.toogleSearchBar;
export const searchBarSlice = (state: State) =>
  [state.openSearchBar, state.toogleSearchBar] as const;

export default useUiStore;
