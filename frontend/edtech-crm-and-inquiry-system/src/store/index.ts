import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "@/admin/features/login/slices/authSlice";
import inquiriesReducer from "@/admin/features/dashbaord/slices/inquiriesSlice"

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    inquiries: inquiriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
