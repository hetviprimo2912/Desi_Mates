import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { DashboardResponse } from "../../../Types/DashboardTypes/dashboard_types";

export const fetch_dashboard = createAsyncThunk<
    DashboardResponse,
    void,
    { rejectValue: string }
>(
    "dashboard/fetch_dashboard",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post("/dashboard_api");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);
