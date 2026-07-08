import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type {
    CategoryCardResponse,
} from "../../../Types/CategoryTypes/category_card_types";

export const category_card = createAsyncThunk(
    "category/card",
    async (_, thunkAPI) => {

        try {

            const response =
                await axios.post<CategoryCardResponse>(
                    "/category_card"
                );

            return response.data.data;

        } catch (error: any) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch category cards."
            );

        }

    }
);