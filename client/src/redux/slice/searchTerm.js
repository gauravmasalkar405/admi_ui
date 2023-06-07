import { createSlice } from "@reduxjs/toolkit";

// state
const initialState = {
  searchTerm: "",
};

// slice
const searchTermSlice = createSlice({
  name: "searchTerm",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload.searchTerm;
    },
  },
});

// exporting actions
export const { setSearchTerm } = searchTermSlice.actions;

// exporting slice
export default searchTermSlice.reducer;
