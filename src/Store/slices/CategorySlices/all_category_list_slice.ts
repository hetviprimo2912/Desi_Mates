import { createSlice } from "@reduxjs/toolkit";

import { all_category_list } from "./all_category_list_thunk";

import type {
  AllCategoryListState,
} from "../../../Types/CategoryTypes/all_category_list_types";
import { toggle_category } from "./toggle_category_thunk";

const initialState: AllCategoryListState = {
  loading: false,
  error: null,
  category: [],
  pagination: null,
};

const allCategoryListSlice = createSlice({
  name: "all_category_list",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(all_category_list.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(all_category_list.fulfilled, (state, action) => {
        state.loading = false;

        state.category = action.payload.category;

        state.pagination = action.payload.pagination;
      })
      .addCase(toggle_category.fulfilled, (state, action) => {

        const updatedCategory = state.category.find(
          (item) => item.id === action.payload.data.id
        );

        if (updatedCategory) {
          updatedCategory.status = action.payload.data.status;
        }

      })
      .addCase(all_category_list.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default allCategoryListSlice.reducer;