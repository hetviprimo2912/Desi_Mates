import { createSlice } from "@reduxjs/toolkit";

import { report_list } from "./report_list_thunk";

import type {
  ReportListState,
} from "../../../Types/ReportTypes/report_list_types";

const initialState: ReportListState = {
  loading: false,
  error: null,
  reports: [],
  pagination: null,
};

const reportListSlice = createSlice({
  name: "report_list",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(report_list.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(report_list.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.data.reports;
        state.pagination = action.payload.data.pagination;
      })

      .addCase(report_list.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default reportListSlice.reducer;