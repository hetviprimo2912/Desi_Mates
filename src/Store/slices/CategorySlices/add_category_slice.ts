import { createSlice } from "@reduxjs/toolkit";

import { add_category } from "./add_category_thunk";

import type {
  AddCategoryState,
} from "../../../Types/CategoryTypes/add_category_types";

const initialState: AddCategoryState = {

  loading: false,

  error: null,

};

const addCategorySlice = createSlice({

  name: "add_category",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(add_category.pending, (state) => {

        state.loading = true;

        state.error = null;

      })

      .addCase(add_category.fulfilled, (state) => {

        state.loading = false;

      })

      .addCase(add_category.rejected, (state, action) => {

        state.loading = false;

        state.error =
          action.payload ||
          "Something went wrong";

      });

  },

});

export default addCategorySlice.reducer;