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

const acceptedSlice = createSlice({
    name: "setAcceptedOrders", 
    initialState: {
       acceptOrder:[]
    },
    reducers: {
        getAcceptedOrders: (state, action) => {
      // assign the payload to your state
      state.acceptOrder = action.payload;
    }
    }
});

 export const {getAcceptedOrders} = acceptedSlice.actions; 
const pendingSlice = createSlice({
    name: "setPendingOrders", 
    initialState: {
       pendingOrder:[]
    },
    reducers: {
        getPendingOrders: (state, action) => {
      // assign the payload to your state
      state.pendingOrder = action.payload;
    }
    }
});

 export const {getPendingOrders} = pendingSlice.actions; 
const cancelledSlice = createSlice({
    name: "setCancelledOrders", 
    initialState: {
       cancelledOrder:[]
    },
    reducers: {
        getCancelledOrders: (state, action) => {
      // assign the payload to your state
      state.cancelledOrder = action.payload;
    }
    }
});

 export const {getCancelledOrders} = cancelledSlice.actions; 

const myStore = configureStore({
  reducer: {
    allProduct: allProduct.reducer,
    acceptedOrder:acceptedSlice.reducer,
    pendingOrder:pendingSlice.reducer,
    cancelledOrder:cancelledSlice.reducer

    
  },
});

export default myStore;
