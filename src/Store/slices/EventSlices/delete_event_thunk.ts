import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { DeleteEventPayload, DeleteEventResponse } from "../../../Types/EventTypes/delete_event_types";

export const delete_event = createAsyncThunk<
  DeleteEventResponse,
  DeleteEventPayload,
  { rejectValue: string }
>(
  "event/delete_event",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/delete_event", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);
