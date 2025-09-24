import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Axios/AxiosInstance';

// Async thunk for fetching products
export const fetchAllProducts = createAsyncThunk(
  "GetProducts/fetchAllProducts",
  async () => {
    const res = await axiosInstance.get("api/products");
    return res.data.products;
  }
);

const allProduct = createSlice({
  name: "GetProducts",
  initialState: {
    All_Product: [],
    status: "idle",
    error: null,
  },
  reducers: {}, // leave empty for now
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.All_Product = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const myStore = configureStore({
  reducer: {
    allProduct: allProduct.reducer,
  },
});

export default myStore;
