import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  messages: [],
  currentMessage: null,
  isLoading: false,
  error: null,
  message: null,
};

// User & Guest (to send an email/contact message)
export const createContactMessage = createAsyncThunk(
  "contact/createMessage",
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/contact", messageData);
      return {
        newMessage: response.data.newMessage,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message",
      );
    }
  },
);

// Admin (to get all messages)
export const getAllMessages = createAsyncThunk(
  "admin/contact/getAllMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/messages");
      return { messages: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch messages",
      );
    }
  },
);

// Admin (to get a specific message by ID)
export const getMessageById = createAsyncThunk(
  "admin/contact/getMessageById",
  async (messageId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/message/${messageId}`);
      return { message: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch the message",
      );
    }
  },
);

// Admin (to delete a message)
export const deleteMessage = createAsyncThunk(
  "admin/contact/deleteMessage",
  async (messageId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/message/${messageId}`,
      );
      return {
        id: messageId,
        message: response.data.message || "Message deleted successfully",
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete message",
      );
    }
  },
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    resetContactState: (state) => {
      state.messages = [];
      state.currentMessage = null;
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
      // // // // // // User: Create Message // // // // // //
      .addCase(createContactMessage.pending, handlePending)
      .addCase(createContactMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        if (state.messages) state.messages.push(action.payload.newMessage);
      })
      .addCase(createContactMessage.rejected, handleRejected)

      // // // // // // Admin: Get All Messages // // // // // //
      .addCase(getAllMessages.pending, handlePending)
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload.messages;
      })
      .addCase(getAllMessages.rejected, handleRejected)

      // // // // // // Admin: Get Message By ID // // // // // //
      .addCase(getMessageById.pending, handlePending)
      .addCase(getMessageById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMessage = action.payload.message;
      })
      .addCase(getMessageById.rejected, handleRejected)

      // // // // // // Admin: Delete Message // // // // // //
      .addCase(deleteMessage.pending, handlePending)
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = state.messages.filter(
          (message) => message._id !== action.payload.id,
        );
        state.message = action.payload.message;
        if (state.currentMessage?._id === action.payload.id) {
          state.currentMessage = null;
        }
      })
      .addCase(deleteMessage.rejected, handleRejected);
  },
});

export const { clearError, clearMessage, resetContactState } =
  contactSlice.actions;
export default contactSlice.reducer;
