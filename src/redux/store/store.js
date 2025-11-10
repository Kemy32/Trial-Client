import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js";
import menuReducer from "../slices/menuSlice.js";
import bookingReducer from "../slices/bookingSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    booking: bookingReducer,
  },
});
