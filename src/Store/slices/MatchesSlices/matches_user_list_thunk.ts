import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  MatchesUserListPayload,
  MatchesUserListResponse,
} from "../../../Types/MatchesTypes/matches_user_list_types";

export const matches_user_list = createAsyncThunk<
  MatchesUserListResponse,
  MatchesUserListPayload,
  {
    rejectValue: string;
  }
>(
  "matches/matches_user_list",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/matches_user_list",
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