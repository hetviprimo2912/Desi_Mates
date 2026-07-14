import { createSlice } from "@reduxjs/toolkit";

import { event_card } from "./event_card_thunk";

import type {
  EventCardState,
} from "../../../Types/EventTypes/event_card_types";

const initialState: EventCardState = {
  loading: false,
  error: null,
  data: null,
};

const eventCardSlice = createSlice({
  name: "event_card",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(event_card.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(event_card.fulfilled, (state, action) => {
        state.loading = false;

        state.data = action.payload.data;
      })

      .addCase(event_card.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default eventCardSlice.reducer;