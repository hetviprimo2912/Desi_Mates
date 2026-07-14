import { createSlice } from "@reduxjs/toolkit";

import { event_list } from "./event_list_thunk";

import type {
  EventListState,
} from "../../../Types/EventTypes/event_list_types";

const initialState: EventListState = {
  loading: false,
  error: null,
  events: [],
  pagination: null,
};

const eventListSlice = createSlice({
  name: "event_list",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(event_list.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(event_list.fulfilled, (state, action) => {
        state.loading = false;

        state.events = action.payload.event;

        state.pagination = action.payload.pagination;
      })

      .addCase(event_list.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default eventListSlice.reducer;