import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { GetStarSignDetailsPayload, GetStarSignDetailsResponse } from "../../../Types/StarTypes/edit_starsign_types";

export const get_starsign_details = createAsyncThunk<
    GetStarSignDetailsResponse,
    GetStarSignDetailsPayload,
    { rejectValue: string }
>(
    "starsign/get_starsign_details",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("id", payload.id);

            const response = await axios.post("/edit_starsign", formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);
