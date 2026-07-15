import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  ReportListPayload,
  ReportListResponse,
} from "../../../Types/ReportTypes/report_list_types";

export const report_list = createAsyncThunk<
  ReportListResponse,
  ReportListPayload,
  {
    rejectValue: string;
  }
>(
  "report/report_list",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/report_list",
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