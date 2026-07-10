import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    DeleteCategoryPayload,
    DeleteCategoryResponse,
} from "../../../Types/CategoryTypes/delete_category_types";

export const delete_category = createAsyncThunk<
    DeleteCategoryResponse,
    DeleteCategoryPayload,
    { rejectValue: string }
>(
    "category/delete_category",

    async (payload, { rejectWithValue }) => {

        try {

            const formData = new FormData();

            formData.append("id", payload.id);

            const response = await axios.post(
                "/delete_category",
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