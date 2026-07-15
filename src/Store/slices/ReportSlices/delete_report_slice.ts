import { createSlice } from "@reduxjs/toolkit";

import { delete_report } from "./delete_report_thunk";

import type {
  DeleteReportState,
} from "../../../Types/ReportTypes/delete_report_types";

const initialState: DeleteReportState = {
  loading: false,
  error: null,
  success: false,
};

const deleteReportSlice = createSlice({
  name: "delete_report",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(delete_report.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(delete_report.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(delete_report.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default deleteReportSlice.reducer;