import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  EventListPayload,
  EventListResponse,
} from "../../../Types/EventTypes/event_list_types";

export const event_list = createAsyncThunk<
  EventListResponse,
  EventListPayload,
  {
    rejectValue: string;
  }
>(
  "event/event_list",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/event_list",
        payload
      );

      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message;

      if (typeof message === "string") {
        return rejectWithValue(message);
      }

      return rejectWithValue("Something went wrong");
    }
  }
);