import { createSlice } from "@reduxjs/toolkit";

import { religion_list } from "./religion_list_thunk";

import type {
  ReligionListState,
} from "../../../Types/ReligionTypes/religion_list_types";

const initialState: ReligionListState = {
  loading: false,
  error: null,
  religion: [],
  pagination: null,
};

const religionListSlice = createSlice({
  name: "religion_list",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(religion_list.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(religion_list.fulfilled, (state, action) => {
        state.loading = false;

        state.religion = action.payload.religion;

        state.pagination = action.payload.pagination;
      })

      .addCase(religion_list.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default religionListSlice.reducer;