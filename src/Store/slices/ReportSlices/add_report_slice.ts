import { createSlice } from "@reduxjs/toolkit";
import { add_report } from "./add_report_thunk";
import type { AddReportState } from "../../../Types/ReportTypes/add_report_types";

const initialState: AddReportState = {
    loading: false,
    error: null,
    success: false,
};

const addReportSlice = createSlice({
    name: "add_report",
    initialState,
    reducers: {
        reset_add_report: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_report.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(add_report.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(add_report.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export const { reset_add_report } = addReportSlice.actions;
export default addReportSlice.reducer;
