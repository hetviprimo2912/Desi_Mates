import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  ReligionListPayload,
  ReligionListResponse,
} from "../../../Types/ReligionTypes/religion_list_types";

export const religion_list = createAsyncThunk<
  ReligionListResponse,
  ReligionListPayload,
  {
    rejectValue: string;
  }
>(
  "religion/religion_list",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/religion_list",
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