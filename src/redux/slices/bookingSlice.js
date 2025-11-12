import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  bookings: [],
  currentBooking: null,
  filteredBookings: [],
  selectedStatus: "all",

  isLoading: false,

  error: null,
  message: null,
};

// User (to create a booking)
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/bookings", bookingData);
      return {
        booking: response.data.booking,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create booking"
      );
    }
  }
);

// User (to get his bookings)
export const getUserBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/bookings");
      return {
        bookings: response.data.bookings,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get user's bookings"
      );
    }
  }
);

// User (to get a specific booking)
export const getBookingById = createAsyncThunk(
  "bookings/fetchBookingById",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/bookings/${bookingId}`);
      return { booking: response.data.booking, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get booking by id"
      );
    }
  }
);

// User (to cancel a booking)
export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async ({ bookingId, bookingStatus }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/bookings/${bookingId}`, {
        bookingStatus,
      });
      return { booking: response.data.booking, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel booking"
      );
    }
  }
);

// Admin (to get all bookings)
export const getAllUsersBookings = createAsyncThunk(
  "admin/bookings/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/bookings");
      return {
        booking: response.data.bookings,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get users' bookings"
      );
    }
  }
);

// Admin (to get user's bookings)
export const getUserAllBookings = createAsyncThunk(
  "admin/users/userId/bookings/fetchBookings",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/admin/users/${userId}/bookings`
      );
      return {
        bookings: response.data.bookings,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get user's bookings"
      );
    }
  }
);

// Admin (to update a booking status)
export const updateBookingStatus = createAsyncThunk(
  "admin/bookings/updateBookingStatus",
  async ({ bookingId, bookingStatus }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/bookings/${bookingId}`,
        {
          bookingStatus,
        }
      );
      return {
        booking: response.data.booking,
        message: response.data.message,
        notificaiton: response.data.notification,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update booking status"
      );
    }
  }
);

// // // // Must be reviewed
// Admin (to get all bookings by status)
// export const getBookingsByStatus = createAsyncThunk(
//   "admin/bookings/fetchBookingsByStatus",
//   async (status, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(
//         `/admin/bookings?status=${status}`
//       );
//       return {
//         bookings: response.data.bookings,
//         message: response.data.message,
//       };
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message ||
//           `Failed to get users' bookings with status ${status}`
//       );
//     }
//   }
// );

// Admin (to delete a booking by id)
export const deleteBooking = createAsyncThunk(
  "admin/bookings/deleteBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/bookings/${bookingId}`
      );
      return { message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete booking"
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // filterBookingByStatus: (state, action) => {
    //   if (action.payload === "all") {
    //     state.filteredBookings = state.bookings;
    //   } else {
    //     state.filteredBookings = state.bookings.filter(
    //       (booking) => booking.status === action.payload
    //     );
    //   }
    // },
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetMenuState: (state) => {
      state.menuItems = [];
      state.currentItem = null;
      state.filteredItems = [];
      state.selectedCategory = "all";
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Helper function to find and update a booking in the array
    const updateBookingInArray = (state, updatedBooking) => {
      const index = state.bookings.findIndex(
        (booking) => booking._id === updatedBooking._id
      );
      if (index !== -1) {
        state.bookings[index] = updatedBooking;
      }
      // Also update currentBooking if it matches
      if (state.currentBooking?._id === updatedBooking._id) {
        state.currentBooking = updatedBooking;
      }
    };

    // Helper function for consistent handling of pending state
    const handlePending = (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    };

    // Helper function for consistent handling of rejected state
    const handleRejected = (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.message = null;
    };

    builder
      // // // // // // User: Create Booking // // // // // //
      .addCase(createBooking.pending, handlePending)
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings.push(action.payload.booking);
        state.message = action.payload.message;
      })
      .addCase(createBooking.rejected, handleRejected)

      // // // // // // User: Get User Bookings // // // // // //
      .addCase(getUserBookings.pending, handlePending)
      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload.bookings;
        state.message = action.payload.message;
      })
      .addCase(getUserBookings.rejected, handleRejected)

      // // // // // // User: Get Booking By ID // // // // // //
      .addCase(getBookingById.pending, handlePending)
      .addCase(getBookingById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBooking = action.payload.booking;
        state.message = action.payload.message;
      })
      .addCase(getBookingById.rejected, handleRejected)

      // // // // // // User: Cancel Booking // // // // // //
      .addCase(cancelBooking.pending, handlePending)
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        updateBookingInArray(state, action.payload.booking);
        state.message = action.payload.message;
      })
      .addCase(cancelBooking.rejected, handleRejected)

      // // // // // // Admin: Get All Bookings // // // // // //
      .addCase(getAllUsersBookings.pending, handlePending)
      .addCase(getAllUsersBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload.bookings;
        state.message = action.payload.message;
      })
      .addCase(getAllUsersBookings.rejected, handleRejected)

      // // // // // // Admin: Get User's All Bookings // // // // // //
      .addCase(getUserAllBookings.pending, handlePending)
      .addCase(getUserAllBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload.bookings;
        state.message = action.payload.message;
      })
      .addCase(getUserAllBookings.rejected, handleRejected)

      // // // // // // Admin: Get Bookings By Status // // // // // //
      // .addCase(getBookingsByStatus.pending, handlePending)
      // .addCase(getBookingsByStatus.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.bookings = action.payload.bookings;
      //   state.message = action.payload.message;
      // })
      // .addCase(getBookingsByStatus.rejected, handleRejected)

      // // // // // // Admin: Update Booking Status // // // // // //
      .addCase(updateBookingStatus.pending, handlePending)
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        updateBookingInArray(state, action.payload.booking);
        state.message = action.payload.message;
      })
      .addCase(updateBookingStatus.rejected, handleRejected)

      // // // // // // Admin: Delete Booking // // // // // //
      .addCase(deleteBooking.pending, handlePending)
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedId = action.meta.arg;
        state.bookings = state.bookings.filter((b) => b._id !== deletedId);
        if (state.currentBooking?._id === deletedId) {
          state.currentBooking = null;
        }
        state.message = action.payload.message;
      })
      .addCase(deleteBooking.rejected, handleRejected);
  },
});

export const { clearError, clearMessage, resetBookingState } =
  bookingSlice.actions;
export default bookingSlice.reducer;
