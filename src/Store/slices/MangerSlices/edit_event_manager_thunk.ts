import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { EditEventManagerPayload, EditEventManagerResponse } from "../../../Types/ManagerTypes/edit_event_manager_types";

export const edit_event_manager = createAsyncThunk<
    EditEventManagerResponse,
    EditEventManagerPayload,
    { rejectValue: string }
>(
    "manager/edit_event_manager",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("id", payload.id);
            formData.append("name", payload.name);
            formData.append("email", payload.email);
            formData.append("password", payload.password);
            const response = await axios.post("/edit_event_manager", formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);
