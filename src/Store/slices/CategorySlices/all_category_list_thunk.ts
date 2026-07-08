import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  AllCategoryListPayload,
  AllCategoryListResponse,
} from "../../../Types/CategoryTypes/all_category_list_types";

export const all_category_list = createAsyncThunk<
  AllCategoryListResponse,
  AllCategoryListPayload,
  {
    rejectValue: string;
  }
>(
  "category/all_category_list",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/all_category_list",
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