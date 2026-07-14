import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type {
    DeleteReligionPayload,
    DeleteReligionResponse,
} from "../../../Types/ReligionTypes/delete_religion_types";

export const delete_religion = createAsyncThunk<
    DeleteReligionResponse,
    DeleteReligionPayload,
    { rejectValue: string }
>(
    "religion/delete_religion",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            formData.append("id", payload.id);

            const response = await axios.post(
                "/delete_religion",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
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