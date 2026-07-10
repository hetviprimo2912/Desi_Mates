import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { AddStarSignPayload, AddStarSignResponse } from "../../../Types/StarTypes/add_starsign_types";

export const add_starsign = createAsyncThunk<
    AddStarSignResponse,
    AddStarSignPayload,
    { rejectValue: string }
>(
    "starsign/add_starsign",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("name", payload.name);
            formData.append("description", payload.description);

            const response = await axios.post("/add_starsign", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);
