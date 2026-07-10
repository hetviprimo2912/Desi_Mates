import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { AddInterestPayload, AddInterestResponse } from "../../../Types/InterestTypes/add_interest_types";

export const add_interest = createAsyncThunk<
    AddInterestResponse,
    AddInterestPayload,
    { rejectValue: string }
>(
    "interest/add_interest",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("name", payload.name);
            formData.append("description", payload.description);
            formData.append("image", payload.image);
            formData.append("status", payload.status);

            const response = await axios.post("/add_interest", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);
