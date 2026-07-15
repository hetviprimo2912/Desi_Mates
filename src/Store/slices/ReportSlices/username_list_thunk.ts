import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { UsernameListResponse } from "../../../Types/ReportTypes/add_report_types";

export const get_username_list = createAsyncThunk<
    UsernameListResponse,
    void,
    { rejectValue: string }
>(
    "report/get_username_list",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post("/get_username_list");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);
