import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  DeletePaymentPayload,
  DeletePaymentResponse,
} from "../../../Types/PaymentTypes/delete_payment_types";

export const delete_payment = createAsyncThunk<
  DeletePaymentResponse,
  DeletePaymentPayload,
  {
    rejectValue: string;
  }
>(
  "payment/delete_payment",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/delete_payment",
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