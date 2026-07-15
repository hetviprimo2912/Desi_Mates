import { createSlice } from "@reduxjs/toolkit";

import { matches_card } from "./matches_card_thunk";

import type {
  MatchesCardState,
} from "../../../Types/MatchesTypes/matches_card_types";

const initialState: MatchesCardState = {
  loading: false,
  error: null,
  cards: null,
};

const matchesCardSlice = createSlice({
  name: "matches_card",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(matches_card.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(matches_card.fulfilled, (state, action) => {
        state.loading = false;

        state.cards = action.payload.data;
      })

      .addCase(matches_card.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default matchesCardSlice.reducer;