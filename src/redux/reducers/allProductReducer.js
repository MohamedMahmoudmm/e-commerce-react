import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Axios/AxiosInstance';
import allOrders from './allOrderReducer';
import favoriteReducer from './favReducer';
// Async thunk for fetching products
export const fetchAllProducts = createAsyncThunk(
  "GetProducts/fetchAllProducts",
  async () => {
    const res = await axiosInstance.get("api/products");
    return res.data.products;
  }
);

// export const fetchFAvouriteProducts = createAsyncThunk(
//   "GetProducts/fetchFAvouriteProducts",
//   async () => {
//     const res = await axiosInstance.get("favourites");
//     return res.data.products;
//   }
// );

// export const fetchCartProducts = createAsyncThunk(
//   "GetProducts/fetchCartProducts",
//   async () => {
//     const res = await axiosInstance.get("cart");
//     return res.data.products;
//   }
// );

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

export const getCategories = () => {
  return axiosInstance.get("/categories"); 
};
const myStore = configureStore({
  reducer: {
    allProduct: allProduct.reducer,
    allOrders,
    favorite: favoriteReducer, 

  },
});

export default myStore;
