import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  PaymentUserListPayload,
  PaymentUserListResponse,
} from "../../../Types/PaymentTypes/payment_user_list_types";

export const payment_user_list = createAsyncThunk<
  PaymentUserListResponse,
  PaymentUserListPayload,
  {
    rejectValue: string;
  }
>(
  "payment/payment_user_list",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/payment_user_list",
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