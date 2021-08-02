import { SetState, GetState, State as TState } from "zustand";
export type SliceStore<State extends TState> = (
  set: SetState<State>,
  get: GetState<State>
) => State;
