import { createSlice } from "@reduxjs/toolkit";
import { event_view } from "./event_view_thunk";
import type { EventViewState } from "../../../Types/EventTypes/event_view_types";

const initialState: EventViewState = {
  loading: false,
  error: null,
  event: null,
};

const eventViewSlice = createSlice({
  name: "event_view",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(event_view.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(event_view.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload.event;
      })
      .addCase(event_view.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default eventViewSlice.reducer;
