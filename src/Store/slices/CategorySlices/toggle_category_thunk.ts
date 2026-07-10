import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  ToggleCategoryPayload,
  ToggleCategoryResponse,
} from "../../../Types/CategoryTypes/toggle_category_types";

export const toggle_category = createAsyncThunk<
  ToggleCategoryResponse,
  ToggleCategoryPayload,
  {
    rejectValue: string;
  }
>(
  "category/toggle_category",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/toggle_category",
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