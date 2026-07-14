import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type {
    EditReligionPayload,
    EditReligionResponse,
} from "../../../Types/ReligionTypes/edit_religion_types";

export const edit_religion = createAsyncThunk<
    EditReligionResponse,
    EditReligionPayload,
    { rejectValue: string }
>(
    "religion/edit_religion",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            formData.append("id", payload.id);
            formData.append("name", payload.name);
            formData.append("description", payload.description);

            const response = await axios.post(
                "/edit_religion",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
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