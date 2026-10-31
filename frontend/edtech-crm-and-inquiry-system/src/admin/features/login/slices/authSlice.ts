import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Admin, AuthState } from "../../types/adminPayload";

const initialState: AuthState = {
  admin: null,
  isAuthenticated: false,
};

const adminAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
    },
    clearAdmin: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAdmin, clearAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;