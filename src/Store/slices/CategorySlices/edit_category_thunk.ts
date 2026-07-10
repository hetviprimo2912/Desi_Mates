import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    EditCategoryPayload,
    EditCategoryResponse,
} from "../../../Types/CategoryTypes/edit_category_types";

export const edit_category = createAsyncThunk<
    EditCategoryResponse,
    EditCategoryPayload,
    { rejectValue: string }
>(
    "category/edit_category",

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

            const response = await axios.post(
                "/edit_category",
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