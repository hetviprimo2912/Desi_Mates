import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  PaymentCardResponse,
} from "../../../Types/PaymentTypes/payment_card_types";

export const payment_card = createAsyncThunk<
  PaymentCardResponse,
  void,
  {
    rejectValue: string;
  }
>(
  "payment/payment_card",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/payment_card"
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