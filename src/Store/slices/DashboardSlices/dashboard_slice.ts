import { createSlice } from "@reduxjs/toolkit";
import { fetch_dashboard } from "./dashboard_thunk";
import type { DashboardState } from "../../../Types/DashboardTypes/dashboard_types";

const initialState: DashboardState = {
    loading: false,
    error: null,
    data: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetch_dashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetch_dashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(fetch_dashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default dashboardSlice.reducer;
