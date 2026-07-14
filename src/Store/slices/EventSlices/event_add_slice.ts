import { createSlice } from "@reduxjs/toolkit";

import { event_add } from "./event_add_thunk";

import type {
  EventAddState,
} from "../../../Types/EventTypes/event_add_types";

const initialState: EventAddState = {
  loading: false,
  error: null,
  success: false,
  message: "",
};

const eventAddSlice = createSlice({
  name: "event_add",

  initialState,

  reducers: {
    resetEventAddState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(event_add.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(event_add.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })

      .addCase(event_add.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export const { resetEventAddState } =
  eventAddSlice.actions;

export default eventAddSlice.reducer;