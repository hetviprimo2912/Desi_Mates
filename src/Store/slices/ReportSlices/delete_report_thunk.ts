import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
  DeleteReportPayload,
  DeleteReportResponse,
} from "../../../Types/ReportTypes/delete_report_types";

export const delete_report = createAsyncThunk<
  DeleteReportResponse,
  DeleteReportPayload,
  {
    rejectValue: string;
  }
>(
  "report/delete_report",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/delete_report",
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