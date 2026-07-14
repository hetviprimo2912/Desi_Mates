import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  ReligionCardPayload,
  ReligionCardResponse,
} from "../../../Types/ReligionTypes/religion_card_types";

export const religion_card = createAsyncThunk<
  ReligionCardResponse,
  ReligionCardPayload,
  {
    rejectValue: string;
  }
>(
  "religion/religion_card",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/religion_card",
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