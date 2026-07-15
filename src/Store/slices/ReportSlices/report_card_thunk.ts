import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  ReportCardResponse,
} from "../../../Types/ReportTypes/report_card_types";

export const report_card = createAsyncThunk<
  ReportCardResponse,
  void,
  {
    rejectValue: string;
  }
>(
  "report/report_card",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/report_card"
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