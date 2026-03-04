import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  blogsArticles: [],
  currentArticle: null,
  isLoading: false,
  error: null,
  message: null,
};

// Admin & User (to view all blogs|articles)
export const getAllBlogsArticles = createAsyncThunk(
  "blogs-articles/getAllBlogsArticles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/blogs-articles");
      return {
        blogsArticles: response.data.blogsArticles,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get blogs-articles",
      );
    }
  },
);

// Admin & User (to view a blog|article)
export const getBlogArticleById = createAsyncThunk(
  "blogs-articles/getBlogArticleById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/blogs-articles/${id}`);
      return {
        blogArticle: response.data.blogArticle,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get blog-article",
      );
    }
  },
);

// Admin (to create a blog|article)
export const createBlogArticle = createAsyncThunk(
  "admin/blogs-articles/createBlogArticle",
  async (blogData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in blogData) {
        formData.append(key, blogData[key]);
      }
      const response = await axiosInstance.post(
        "/admin/blogs-articles",
        formData,
      );
      return {
        blogArticle: response.data.newBlogArticle,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create blog-article",
      );
    }
  },
);

// Admin (to update a blog|article)
export const updateBlogArticle = createAsyncThunk(
  "admin/blogs-articles/updateBlogArticle",
  async ({ id, blogData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in blogData) {
        formData.append(key, blogData[key]);
      }
      const response = await axiosInstance.patch(
        `/admin/blogs-articles/${id}`,
        formData,
      );
      return {
        blogArticle: response.data.updatedBlogArticle,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update blog-article",
      );
    }
  },
);

// Admin (to delete a blog|article)
export const deleteBlogArticle = createAsyncThunk(
  "admin/blogs-articles/deleteBlogArticle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/blogs-articles/${id}`,
      );
      return {
        id,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete blog-article",
      );
    }
  },
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    resetBlogState: (state) => {
      state.blogsArticles = [];
      state.currentArticle = null;
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
      // Get All Blogs
      .addCase(getAllBlogsArticles.pending, handlePending)
      .addCase(getAllBlogsArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogsArticles = action.payload.blogsArticles;
        state.message = action.payload.message;
      })
      .addCase(getAllBlogsArticles.rejected, handleRejected)

      // Get Blog By ID
      .addCase(getBlogArticleById.pending, handlePending)
      .addCase(getBlogArticleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentArticle = action.payload.blogArticle;
        state.message = action.payload.message;
      })
      .addCase(getBlogArticleById.rejected, handleRejected)

      // Create Blog
      .addCase(createBlogArticle.pending, handlePending)
      .addCase(createBlogArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogsArticles.push(action.payload.blogArticle);
        state.message = action.payload.message;
      })
      .addCase(createBlogArticle.rejected, handleRejected)

      // Update Blog
      .addCase(updateBlogArticle.pending, handlePending)
      .addCase(updateBlogArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.blogsArticles.findIndex(
          (article) => article._id === action.payload.blogArticle._id,
        );
        if (index !== -1) {
          state.blogsArticles[index] = action.payload.blogArticle;
        }
        if (state.currentArticle?._id === action.payload.blogArticle._id) {
          state.currentArticle = action.payload.blogArticle;
        }
        state.message = action.payload.message;
      })
      .addCase(updateBlogArticle.rejected, handleRejected)

      // Delete Blog
      .addCase(deleteBlogArticle.pending, handlePending)
      .addCase(deleteBlogArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogsArticles = state.blogsArticles.filter(
          (article) => article._id !== action.payload.id,
        );
        if (state.currentArticle?._id === action.payload.id) {
          state.currentArticle = null;
        }
        state.message = action.payload.message;
      })
      .addCase(deleteBlogArticle.rejected, handleRejected);
  },
});

export const { clearError, clearMessage, resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;
