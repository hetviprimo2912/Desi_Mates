import { createSlice } from "@reduxjs/toolkit";

import { all_category_list } from "./all_category_list_thunk";

import type {
  AllCategoryListState,
} from "../../../Types/CategoryTypes/all_category_list_types";

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

      .addCase(all_category_list.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default allCategoryListSlice.reducer;