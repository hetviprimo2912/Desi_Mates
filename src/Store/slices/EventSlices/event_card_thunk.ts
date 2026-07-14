import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  EventCardResponse,
} from "../../../Types/EventTypes/event_card_types";

export const event_card = createAsyncThunk<
  EventCardResponse,
  void,
  {
    rejectValue: string;
  }
>(
  "event/event_card",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/event_card");

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