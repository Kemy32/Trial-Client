import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserProfile, updateAdminProfile } from "./userSlice";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  isLoggedOut: true,
  isLoading: false,

  isCredentialValid: false,
  // OTP-specific states
  pendingVerification: false, // User registered, waiting for OTP
  pendingEmail: null, // Email waiting for OTP verification
  isVerified: false, // User has verified email

  // Error
  error: null,
  // Success messages
  message: null,
  loggedOutMessage: null,
};
// User (to check if authenticated on app load)
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/current-user");
      return { user: response.data.user };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Not authenticated",
      );
    }
  },
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
      const isVerified = error.response?.data?.isVerified;
      const isCredentialValid = error.response?.data?.isCredentialValid;
      const errorMessage = error.response?.data?.message || "Login failed";

      if (!isVerified && isCredentialValid) {
        return rejectWithValue({ message: errorMessage, email: email });
      }
      return rejectWithValue(errorMessage);
    }
  },
);

// Guest (to register)
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("password", userData.password);

      if (userData.profile_image) {
        formData.append("profile_image", userData.profile_image);
      }

      const response = await axiosInstance.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return {
        user: response.data.user,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
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
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed",
      );
    }
  },
);

// Guest (to resend OTP)
export const resendOtp = createAsyncThunk(
  "auth/resend-otp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/resend-otp", { email });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP resend failed",
      );
    }
  },
);

// User (to log out)
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      return {
        loggedOutMessage: response.data.loggedOutMessage,
        isLoggedOut: response.data.isLoggedOut,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
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
      state.loggedOutMessage = null;
    },
    resetAuth: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    };

    const handleRejected = (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.message = null;
    };

    builder
      // Check Auth
      .addCase(checkAuth.pending, handlePending)
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isInitialized = true;
        state.isLoggedOut = false;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isInitialized = true;
        state.isLoggedOut = true;
        state.user = null;
      })
      // Login
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isLoggedOut = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.isVerified = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload?.email) {
          state.pendingVerification = true;
          state.pendingEmail = action.payload.email;
          state.error = action.payload.message;
        } else {
          state.error = action.payload;
        }
      })
      // Register
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingVerification = true;
        state.pendingEmail = action.payload.user.email;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, handleRejected)
      // Verify OTP
      .addCase(verifyOtp.pending, handlePending)
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isInitialized = true;
        state.isLoggedOut = false;
        state.user = action.payload.user;
        state.pendingVerification = false;
        state.pendingEmail = null;
        state.message = action.payload.message;
        state.isVerified = true;
      })
      .addCase(verifyOtp.rejected, handleRejected)
      // Logout
      .addCase(logout.fulfilled, (state) => {
        Object.assign(state, initialState);
        state.loggedOutMessage = "Logged out successfully";
      })

      // // // // // // PROFILE UPDATE INTEGRATION // // // // // //
      // This is the key part that updates the UI instantly
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const { clearError, clearMessage, resetAuth } = authSlice.actions;
export default authSlice.reducer;
