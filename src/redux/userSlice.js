import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Stores { name, email, photo }
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;