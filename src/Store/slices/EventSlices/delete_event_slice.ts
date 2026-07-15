import { createSlice } from "@reduxjs/toolkit";
import { delete_event } from "./delete_event_thunk";
import type { DeleteEventState } from "../../../Types/EventTypes/delete_event_types";

const initialState: DeleteEventState = {
  loading: false,
  error: null,
  success: false,
};

const deleteEventSlice = createSlice({
  name: "delete_event",
  initialState,
  reducers: {
    resetDeleteEvent(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(delete_event.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(delete_event.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(delete_event.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetDeleteEvent } = deleteEventSlice.actions;
export default deleteEventSlice.reducer;
