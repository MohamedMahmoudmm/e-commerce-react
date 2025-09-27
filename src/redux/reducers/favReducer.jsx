import { createSlice } from "@reduxjs/toolkit";
const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    items: storedFavorites,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((item) => item._id === product._id);
      if (exists) {
        state.items = state.items.filter((item) => item._id !== product._id);
      } else {
        state.items.push(product);
      }

      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});
export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
