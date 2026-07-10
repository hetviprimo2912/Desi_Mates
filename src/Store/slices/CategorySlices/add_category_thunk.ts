import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  AddCategoryPayload,
  AddCategoryResponse,
} from "../../../Types/CategoryTypes/add_category_types";

export const add_category = createAsyncThunk<
  AddCategoryResponse,
  AddCategoryPayload,
  {
    rejectValue: string;
  }
>(
  "category/add_category",

  async (payload, { rejectWithValue }) => {
    try {

      const formData = new FormData();

      formData.append("name", payload.name);

      formData.append(
        "description",
        payload.description
      );

      formData.append(
        "image",
        payload.image
      );

      formData.append(
        "status",
        payload.status
      );

      const response = await axios.post(
        "/add_category",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      return response.data;

    } catch (error: any) {

      const message =
        error.response?.data?.message;

      if (typeof message === "string") {

        return rejectWithValue(message);

      }

      return rejectWithValue(
        "Something went wrong"
      );

    }
  }
);