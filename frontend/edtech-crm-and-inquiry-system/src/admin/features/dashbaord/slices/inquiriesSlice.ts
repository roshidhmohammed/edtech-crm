import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Admin, AuthState } from "../../types/adminPayload";
import type { InquiriesState, Inquiry } from "../types";

const initialState: InquiriesState = {
  inquiries: [],
};

const inquiriesSlice = createSlice({
  name: "inquiries",
  initialState,
  reducers: {
    setInquiries: (state, action: PayloadAction<Inquiry[]>) => {
      state.inquiries = action.payload;
    },
    clearAdmin: (state) => {
      state.inquiries = [];
    },
  },
});

export const { setInquiries, clearAdmin } = inquiriesSlice.actions;
export default inquiriesSlice.reducer;