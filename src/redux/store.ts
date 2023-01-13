import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import goalsSlice from "../features/goals/goalsSlice";
import { nativeApiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    goals: goalsSlice,
    [nativeApiSlice.reducerPath]: nativeApiSlice.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(nativeApiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
