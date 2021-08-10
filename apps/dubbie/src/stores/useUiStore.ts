import create, { SetState, GetState } from "zustand";
import { createSelector } from "reselect";

/*=============================================
=            Ui store            =
=============================================*/

export interface State {
  // search bar
  openSearchBar: boolean;
  toogleSearchBar: () => void;
  // ctrl drawer cart
  openCartDrawer: boolean;
  toogleCartDrawer: () => void;
  // update partial state
  setPartialState: (state: Partial<State>) => void;
}

const useUiStore = create<State>(
  (set: SetState<State>, get: GetState<State>) => ({
    openSearchBar: false,
    openCartDrawer: false,
    toogleSearchBar: () => {
      set({ openSearchBar: !get().openSearchBar });
    },
    setPartialState: (state) => {
      set((_state) => ({
        ..._state,
        ...state,
      }));
    },
    toogleCartDrawer: () => {
      set({ openCartDrawer: !get().openCartDrawer });
    },
  })
);

export const searhBarStateSelector = (state: State) => state.openSearchBar;

export const toggleSearchBar = (state: State) => state.toogleSearchBar;

export const selectActions = ({
  toogleCartDrawer,
  toogleSearchBar,
}: State) => ({
  toogleCartDrawer,
  toogleSearchBar,
});

export const searchBarSlice = (state: State) =>
  [state.openSearchBar, state.toogleSearchBar] as const;

export const selectState = (state: State) => state;

export const selectCartDrawerState = createSelector(
  selectState,
  (state) => state.openCartDrawer
);

export default useUiStore;
