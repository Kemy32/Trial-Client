import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  users: [],
  currentUser: null,
  isLoading: false,
  error: null,
  message: null,
};

// Admin - Get all users
export const getAllUsers = createAsyncThunk(
  "admin/users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/users");
      return { users: response.data.users, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

// Admin - Update own profile
export const updateAdminProfile = createAsyncThunk(
  "admin/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (userData.name) formData.append("name", userData.name);
      if (userData.email) formData.append("email", userData.email);
      if (userData.phone) formData.append("phone", userData.phone);
      if (userData.password) formData.append("password", userData.password);

      const response = await axiosInstance.put("/admin/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return {
        user: response.data.updatedUser,
        message: "Admin profile updated successfully",
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update admin profile",
      );
    }
  },
);

// Admin - Get user by ID
export const getUserById = createAsyncThunk(
  "admin/user",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/users/${userId}`);
      return { user: response.data.user, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user",
      );
    }
  },
);

// Admin - Delete any user by ID
export const deleteUserById = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/admin/users/${userId}`);
      return { id: userId, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user",
      );
    }
  },
);

// User - Get own profile
export const getUserProfile = createAsyncThunk(
  "user/my-profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/profile");
      return response.data; // Assuming this returns the user object directly
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

// User - Update own profile
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (userData.name) formData.append("name", userData.name);
      if (userData.email) formData.append("email", userData.email);
      if (userData.phone) formData.append("phone", userData.phone);
      if (userData.password) formData.append("password", userData.password);
      if (userData.profile_image) {
        formData.append("profile_image", userData.profile_image);
      }

      const response = await axiosInstance.put("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return {
        user: response.data,
        message: "Profile updated successfully",
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

// User - Delete user account (Self)
export const deleteUserSelf = createAsyncThunk(
  "user/deleteUserSelf",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/user/profile");
      return {
        message: response.data.message || "Account deleted successfully",
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete account",
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    resetUserState: (state) => {
      state.users = [];
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
      state.message = null;
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
      // Get All Users
      .addCase(getAllUsers.pending, handlePending)
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users;
        state.message = action.payload.message;
      })
      .addCase(getAllUsers.rejected, handleRejected)

      // Update Admin Profile
      .addCase(updateAdminProfile.pending, handlePending)
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(updateAdminProfile.rejected, handleRejected)

      // Get User By ID
      .addCase(getUserById.pending, handlePending)
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(getUserById.rejected, handleRejected)

      // Get User Profile
      .addCase(getUserProfile.pending, handlePending)
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserProfile.rejected, handleRejected)

      // Update User Profile
      .addCase(updateUserProfile.pending, handlePending)
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(updateUserProfile.rejected, handleRejected)

      // Delete User Account (Self)
      .addCase(deleteUserSelf.pending, handlePending)
      .addCase(deleteUserSelf.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = null;
        state.message = action.payload.message;
      })
      .addCase(deleteUserSelf.rejected, handleRejected)

      // Delete User By ID (Admin Action)
      .addCase(deleteUserById.pending, handlePending)
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        // action.payload is { id, message }
        state.users = state.users.filter((u) => u._id !== action.payload.id);
        state.message = action.payload.message;
      })
      .addCase(deleteUserById.rejected, handleRejected);
  },
});

export const { clearError, clearMessage, resetUserState } = userSlice.actions;
export default userSlice.reducer;
