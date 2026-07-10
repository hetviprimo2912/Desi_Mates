import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { EditInterestPayload, EditInterestResponse } from "../../../Types/InterestTypes/edit_interest_types";

export const edit_interest = createAsyncThunk<
    EditInterestResponse,
    EditInterestPayload,
    { rejectValue: string }
>(
    "interest/edit_interest",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("id", payload.id);
            formData.append("name", payload.name);
            formData.append("description", payload.description);
            formData.append("status", payload.status);
            if (payload.image) {
                formData.append("image", payload.image);
            }

            const response = await axios.post("/edit_interest", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);
