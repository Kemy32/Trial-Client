import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,

  // OTP-specific states
  pendingVerification: false, // User registered, waiting for OTP
  pendingEmail: null, // Email waiting for OTP verification

  // Error
  error: null,
  // Success messages
  message: null,
};

// User (to check if authenticated)
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/me");
      return {
        user: response.data.user,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Not authenticated"
      );
    }
  }
);

// Guest (to log in)
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      return {
        user: response.data.user,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Guest (to register)
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone || "");
      formData.append("password", userData.password);

      if (userData.profile_image) {
        formData.append("profile_image", userData.profile_image);
      }

      const response = await axiosInstance.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return {
        user: response.data.user,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Guest (to verify OTP)
export const verifyOtp = createAsyncThunk(
  "auth/verify-otp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/verify-otp", {
        email,
        otp,
      });
      return {
        message: response.data.message,
        // For reference, but not stored in state
        token: response.data.token,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

// Guest (to resend OTP)
export const resendOtp = createAsyncThunk(
  "auth/resend-otp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/resend-otp", {
        email,
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP resend failed"
      );
    }
  }
);

// User (to log out)
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
      return null;
    } catch (error) {
      return rejectWithValue(error.repsonse?.data?.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },

    resetAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      state.pendingVerification = false;
      state.pendingEmail = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // // // // // // Check Auth (on app load) // // // // // //
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      // // // // // // Login // // // // // //
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // // // // // // Register // // // // // //
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingVerification = true;
        state.pendingEmail = action.payload.user.email;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // // // // // // Verify otp // // // // // //
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.pendingVerification = false;
        state.pendingEmail = null;
        state.message = action.payload.message;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // // // // // // Resend otp // // // // // //
      .addCase(resendOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // // // // // // Logout // // // // // //
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = null;
        state.user = null;
        state.pendingVerification = false;
        state.pendingEmail = null;
        state.message = "Logged out successfully";
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearMessage, resetAuth } = authSlice.actions;
export default authSlice.reducer;

// // // // // // Selectors // // // // // //
// For easy access in components
// export const selectAuth = (state) => state.auth;
// export const selectUser = (state) => state.auth.user;
// export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// export const selectIsLoading = (state) => state.auth.isLoading;
// export const selectError = (state) => state.auth.error;
// export const selectMessage = (state) => state.auth.message;
// export const selectPendingVerification = (state) =>
//   state.auth.pendingVerification;
// export const selectPendingEmail = (state) => state.auth.pendingEmail;
