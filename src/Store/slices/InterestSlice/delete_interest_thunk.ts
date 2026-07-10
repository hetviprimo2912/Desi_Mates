import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { DeleteInterestPayload, DeleteInterestResponse } from "../../../Types/InterestTypes/delete_interest_types";

export const delete_interest = createAsyncThunk<
    DeleteInterestResponse,
    DeleteInterestPayload,
    { rejectValue: string }
>(
    "interest/delete_interest",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("id", payload.id);

            const response = await axios.post("/delete_interest", formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);
