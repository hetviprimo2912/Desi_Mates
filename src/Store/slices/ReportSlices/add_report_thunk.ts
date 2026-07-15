import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { AddReportPayload, AddReportResponse } from "../../../Types/ReportTypes/add_report_types";

export const add_report = createAsyncThunk<
    AddReportResponse,
    AddReportPayload,
    { rejectValue: string }
>(
    "report/add_report",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("user_id", payload.user_id);
            formData.append("peer_id", payload.peer_id);
            formData.append("is_report", payload.is_report);
            const response = await axios.post("/add_report", formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);
