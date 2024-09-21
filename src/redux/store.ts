import { configureStore } from "@reduxjs/toolkit";
import treeviewReducer from "./treeviewSlice";

const store = configureStore({
  reducer: {
    treeview: treeviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
