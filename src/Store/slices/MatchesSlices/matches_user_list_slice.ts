import { createSlice } from "@reduxjs/toolkit";

import { matches_user_list } from "./matches_user_list_thunk";

import type {
  MatchesUserListState,
} from "../../../Types/MatchesTypes/matches_user_list_types";

const initialState: MatchesUserListState = {
  loading: false,
  error: null,
  matches: [],
  pagination: null,
};

const matchesUserListSlice = createSlice({
  name: "matches_user_list",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(matches_user_list.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(matches_user_list.fulfilled, (state, action) => {
        state.loading = false;

        state.matches = action.payload.data.matches;

        state.pagination = action.payload.data.pagination;
      })

      .addCase(matches_user_list.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default matchesUserListSlice.reducer;