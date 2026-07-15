import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { AddEventManagerPayload, AddEventManagerResponse } from "../../../Types/ManagerTypes/add_event_manager_types";

export const add_event_manager = createAsyncThunk<
    AddEventManagerResponse,
    AddEventManagerPayload,
    { rejectValue: string }
>(
    "manager/add_event_manager",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("name", payload.name);
            formData.append("email", payload.email);
            formData.append("password", payload.password);
            const response = await axios.post("/add_event_manager", formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);
