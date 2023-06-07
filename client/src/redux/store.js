import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slice/userData";
import searchTermSlice from "./slice/searchTerm";

export const store = configureStore({
  reducer: {
    data: dataSlice,
    searchTerm: searchTermSlice,
  },
});
