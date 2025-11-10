import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  menuItems: [],
  currentItem: null,
  filteredItems: [],
  selectedCategory: "all", // all ,breakfast, dinner, lunch ,drinks
  search: "",
  isLoading: false,
  error: null,
  message: null,
};

// First variant to get all menu items without search and category filters
// We will make a request to the server to get all menu items then filter using the reducers actions
// Admin, User & Guest (to get all menu items)
// export const getAllMenuItems = createAsyncThunk(
//   "menu/getAllMenuItems",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get("/menu/items");
//       return {
//         menuItems: response.data.menuItems,
//         message: response.data.message,
//       };
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to get menu items"
//       );
//     }
//   }
// );

// Second variant to get all menu items with search and category filters
// We will make a request to the server to get all menu items with the filters applied but we will make a request each time we filter
// Admin, User & Guest (to get all menu items includes search and category filters)
export const getAllMenuItems = createAsyncThunk(
  "menu/getAllMenuItems",
  async ({ search, category }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/menu/items", {
        search,
        category,
      });
      return {
        menuItems: response.data.menuItems,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get menu items"
      );
    }
  }
);

// Admin , User & Guest (to get a menu item)
export const getMenuItemById = createAsyncThunk(
  "menu/getMenuItemById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/menu/${id}`);
      return {
        menuItem: response.data.menuItem,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get menu item by id"
      );
    }
  }
);

// Admin (to create a menu item)
export const createMenuItem = createAsyncThunk(
  "menu/createMenuItem",
  async (menuItemData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/menu/item", menuItemData);
      return {
        menuItem: response.data.menuItem,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create menu item"
      );
    }
  }
);

// Admin (to update menu item)
export const updateMenuItem = createAsyncThunk(
  "menu/updateMenuItem",
  async ({ id, menuItemData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in menuItemData) {
        formData.append(key, menuItemData[key]);
      }

      const response = await axiosInstance.put(`/menu/items/${id}`, formData);
      return {
        menuItem: response.data.menuItem,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update menu item"
      );
    }
  }
);

// Admin (to delete menu item)
export const deleteMenuItem = createAsyncThunk(
  "menu/deleteMenuItem",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/menu/items/${id}`);
      return {
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete menu item"
      );
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    // Fits the first variant
    // filterMenuItems: (state, action) => {
    //   state.selectedCategory = action.payload.category;
    //   state.search = action.payload.search;

    //   if (action.payload.search) {
    //     state.filteredItems = state.menuItems.filter((item) =>
    //       item.name.toLowerCase().includes(action.payload.search.toLowerCase())
    //     );
    //   }
    //   if (action.payload.category !== "all") {
    //     state.filteredItems = state.menuItems.filter(
    //       (item) => item.category === action.payload
    //     );
    //   } else {
    //     state.filteredItems = state.menuItems;
    //   }
    // },
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
    // Helper function for consistency in handling API states
    const handlePending = (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    };

    const handleRejected = (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.message = null;
    }; // Helper function to find and update an item in both lists

    const findAndUpdateItem = (state, updatedItem) => {
      const updateList = (list) => {
        const index = list.findIndex((item) => item._id === updatedItem._id);
        if (index !== -1) {
          list[index] = updatedItem;
        }
      };
      updateList(state.menuItems);
      updateList(state.filteredItems); // Also update currentItem if it matches
      if (state.currentItem?._id === updatedItem._id) {
        state.currentItem = updatedItem;
      }
    };
    builder // // // // // // Get All Menu Items (Filtered by Server) // // // // // //
      .addCase(getAllMenuItems.pending, handlePending)
      .addCase(getAllMenuItems.fulfilled, (state, action) => {
        state.isLoading = false; // Since the server handles the filter, the result set is put into both lists
        state.menuItems = action.payload.menuItems;
        state.filteredItems = action.payload.menuItems;
        state.message = action.payload.message;
      })
      .addCase(getAllMenuItems.rejected, handleRejected) // // // // // // Get Menu Item By ID // // // // // //

      .addCase(getMenuItemById.pending, handlePending)
      .addCase(getMenuItemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentItem = action.payload.menuItem;
        state.message = action.payload.message;
      })
      .addCase(getMenuItemById.rejected, handleRejected) // // // // // // Admin: Create Menu Item // // // // // //

      .addCase(createMenuItem.pending, handlePending)
      .addCase(createMenuItem.fulfilled, (state, action) => {
        state.isLoading = false; // Add new item to both lists
        state.menuItems.push(action.payload.menuItem);
        state.filteredItems.push(action.payload.menuItem);
        state.message = action.payload.message;
      })
      .addCase(createMenuItem.rejected, handleRejected) // // // // // // Admin: Update Menu Item // // // // // //

      .addCase(updateMenuItem.pending, handlePending)
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        state.isLoading = false;
        findAndUpdateItem(state, action.payload.menuItem);
        state.message = action.payload.message;
      })
      .addCase(updateMenuItem.rejected, handleRejected) // // // // // // Admin: Delete Menu Item // // // // // //

      .addCase(deleteMenuItem.pending, handlePending)
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.isLoading = false;
        // Delete item from both lists
        const deletedId = action.meta.arg;

        state.menuItems = state.menuItems.filter(
          (item) => item._id !== deletedId
        );
        state.filteredItems = state.filteredItems.filter(
          (item) => item._id !== deletedId
        );

        if (state.currentItem?._id === deletedId) {
          state.currentItem = null;
        }
        state.message = action.payload.message;
      })
      .addCase(deleteMenuItem.rejected, handleRejected);
  },
});

export const { clearError, clearMessage, resetMenuState } = menuSlice.actions;
export default menuSlice.reducer;
