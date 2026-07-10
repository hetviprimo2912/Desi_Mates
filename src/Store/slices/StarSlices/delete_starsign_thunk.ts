import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { DeleteStarSignPayload, DeleteStarSignResponse } from "../../../Types/StarTypes/delete_starsign_types";

export const delete_starsign = createAsyncThunk<
    DeleteStarSignResponse,
    DeleteStarSignPayload,
    { rejectValue: string }
>(
    "starsign/delete_starsign",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("id", payload.id);

            const response = await axios.post("/delete_starsign", formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);
