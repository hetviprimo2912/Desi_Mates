import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  MatchesCardResponse,
} from "../../../Types/MatchesTypes/matches_card_types";

export const matches_card = createAsyncThunk<
  MatchesCardResponse,
  void,
  {
    rejectValue: string;
  }
>(
  "matches/matches_card",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/matches_card"
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