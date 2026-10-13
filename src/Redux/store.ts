import { configureStore } from "@reduxjs/toolkit";
import { countReducer } from "./slices/countSlices";

export const store = configureStore({
  reducer: {
    count: countReducer
  },

});
export type Actions = ReturnType<typeof store.getState >;
export type APPDispatch = typeof store.dispatch;