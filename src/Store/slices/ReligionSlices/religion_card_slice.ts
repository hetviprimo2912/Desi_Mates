import { createSlice } from "@reduxjs/toolkit";

import { religion_card } from "./religion_card_thunk";

import type {
  ReligionCardState,
} from "../../../Types/ReligionTypes/religion_card_types";

const initialState: ReligionCardState = {
  loading: false,
  error: null,
  cards: null,
};

const religionCardSlice = createSlice({
  name: "religion_card",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(religion_card.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(religion_card.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload.data;
      })

      .addCase(religion_card.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default religionCardSlice.reducer;