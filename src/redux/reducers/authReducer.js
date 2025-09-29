import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Axios/AxiosInstance";

// تسجيل الدخول
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/login", userData);
      return res.data; // { token, user }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

// تسجيل مستخدم جديد
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/signup", userData);
      return res.data; // { message, user }
    } catch (error) {
      const message =
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

// طلب إرسال لينك reset
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/forgot-password", { email });
      return res.data; // { message }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

// إعادة تعيين الباسورد
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/reset-password", {
        token,
        newPassword,
      });
      return res.data; // { message }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    userId: localStorage.getItem("userId") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.userId = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    // login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user?.role;
        state.userId = action.payload.user?._id;

        // تخزين في localStorage
        localStorage.setItem("token", state.token);
        localStorage.setItem("role", state.role);
        localStorage.setItem("userId", state.userId);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

         // forgotPassword
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message; // السيرفر بيرجع {message}
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // resetPassword
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message; // السيرفر بيرجع {message}
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user[0];
        state.token = action.payload.user[0]?.token || null;
        state.role = action.payload.user[0]?.role || 'user';
        state.userId = action.payload.user[0]?._id || null;

        if (state.token) localStorage.setItem("token", state.token);
        if (state.role) localStorage.setItem("role", state.role);
        if (state.userId) localStorage.setItem("userId", state.userId);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
