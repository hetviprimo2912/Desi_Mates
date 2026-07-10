import { createSlice } from "@reduxjs/toolkit";

import { toggle_category } from "./toggle_category_thunk";

import type {
  ToggleCategoryState,
} from "../../../Types/CategoryTypes/toggle_category_types";

const initialState: ToggleCategoryState = {
  loading: false,
  error: null,
};

const toggleCategorySlice = createSlice({
  name: "toggle_category",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(toggle_category.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(toggle_category.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(toggle_category.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default toggleCategorySlice.reducer;