import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type {
    GetReligionDetailsPayload,
    GetReligionDetailsResponse,
} from "../../../Types/ReligionTypes/edit_religion_types";

export const get_religion_details = createAsyncThunk<
    GetReligionDetailsResponse,
    GetReligionDetailsPayload,
    { rejectValue: string }
>(
    "religion/get_religion_details",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            formData.append("id", payload.id);

            const response = await axios.post(
                "/edit_religion",
                formData
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message ||
                    "Something went wrong"
            );
        }
    }
);