import { createSlice } from "@reduxjs/toolkit";

import { report_card } from "./report_card_thunk";

import type {
  ReportCardState,
} from "../../../Types/ReportTypes/report_card_types";

const initialState: ReportCardState = {
  loading: false,
  error: null,
  cards: null,
};

const reportCardSlice = createSlice({
  name: "report_card",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(report_card.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(report_card.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload.data;
      })

      .addCase(report_card.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default reportCardSlice.reducer;