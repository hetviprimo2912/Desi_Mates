import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { EventViewPayload, EventViewResponse } from "../../../Types/EventTypes/event_view_types";

export const event_view = createAsyncThunk<
  EventViewResponse,
  EventViewPayload,
  { rejectValue: string }
>(
  "event/event_view",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/event_view", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);
