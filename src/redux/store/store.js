import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js";
import bookingReducer from "../slices/bookingSlice.js";
import userReducer from "../slices/userSlice.js";
import menuReducer from "../slices/menuSlice.js";
import blogReducer from "../slices/blogSlice.js";
import contactReducer from "../slices/contactSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    user: userReducer,
    menu: menuReducer,
    blog: blogReducer,
    contact: contactReducer,
  },
});
