import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  AddReligionPayload,
  AddReligionResponse,
} from "../../../Types/ReligionTypes/religion_add_types";

export const add_religion = createAsyncThunk<
  AddReligionResponse,
  AddReligionPayload,
  {
    rejectValue: string;
  }
>(
  "religion/add_religion",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/add_religion",
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