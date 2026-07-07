import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  UsersListPayload,
  UsersListResponse,
} from "../../../Types/UsersTypes/users_list_types";

export const users_list = createAsyncThunk<
  UsersListResponse,
  UsersListPayload,
  {
    rejectValue: string;
  }
>(
  "users/users_list",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/users_list",
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