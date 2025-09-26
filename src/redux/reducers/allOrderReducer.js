import {  createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Axios/AxiosInstance';
// Async thunk for fetching orders
export const fetchAllOrders = createAsyncThunk(
  "GetOrders/fetchAllOrders",
  async () => {
    const res = await axiosInstance.get("orders");
    return res.data.data;
  }
);

const allOrders = createSlice({
  name: "GetOrders",
  initialState: {
    All_Orders: [],
    status: "idle",
    error: null,
  },
  reducers: {}, // leave empty for now
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.All_Orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default allOrders.reducer;
