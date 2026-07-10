import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { EditStarSignPayload, EditStarSignResponse } from "../../../Types/StarTypes/edit_starsign_types";

export const edit_starsign = createAsyncThunk<
    EditStarSignResponse,
    EditStarSignPayload,
    { rejectValue: string }
>(
    "starsign/edit_starsign",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("id", payload.id);
            formData.append("name", payload.name);
            formData.append("description", payload.description);

            const response = await axios.post("/edit_starsign", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);
