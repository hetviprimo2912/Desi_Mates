import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { GetInterestDetailsPayload, GetInterestDetailsResponse } from "../../../Types/InterestTypes/edit_interest_types";

export const get_interest_details = createAsyncThunk<
    GetInterestDetailsResponse,
    GetInterestDetailsPayload,
    { rejectValue: string }
>(
    "interest/get_interest_details",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("id", payload.id);

            const response = await axios.post("/edit_interest", formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);
