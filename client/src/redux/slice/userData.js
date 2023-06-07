import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// state
const initialState = {
  data: [],
  isLoading: true,
  isError: false,
};

// action ------> fetching data
export const fetchData = createAsyncThunk("fetchData", async () => {
  const dataResponse = await fetch(
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
  );
  return dataResponse.json();
});

// slice
const dataSlice = createSlice({
  name: "data",
  initialState,
  extraReducers: (builder) => {
    // pending
    builder.addCase(fetchData.pending, (state, action) => {
      state.isLoading = true;
    });

    // fullfilled
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    // rejected
    builder.addCase(fetchData.rejected, (state, action) => {
      state.isError = true;
      console.log(action.payload);
    });
  },
});

// exporting slice
export default dataSlice.reducer;
