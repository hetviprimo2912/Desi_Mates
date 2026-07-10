import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    GetCategoryDetailsPayload,
    GetCategoryDetailsResponse,
} from "../../../Types/CategoryTypes/get_category_details_types";

export const get_category_details = createAsyncThunk<
    GetCategoryDetailsResponse,
    GetCategoryDetailsPayload,
    { rejectValue: string }
>(
    "category/get_category_details",

    async (payload, { rejectWithValue }) => {

        try {

            const formData = new FormData();

            formData.append("id", payload.id);

            const response = await axios.post(
                "/edit_category",
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