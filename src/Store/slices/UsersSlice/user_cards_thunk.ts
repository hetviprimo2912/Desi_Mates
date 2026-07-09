import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";

import type {
    UserCardsResponse,
} from "../../../Types/UsersTypes/user_cards_types";

export const user_cards = createAsyncThunk<
    UserCardsResponse,
    void,
    {
        rejectValue: string;
    }
>(
    "users/user_cards",

    async (_, { rejectWithValue }) => {

        try {

            const response = await axios.post(
                "/user_cards"
            );

            return response.data;

        } catch (error: any) {

            const message =
                error.response?.data?.message;

            if (typeof message === "string") {
                return rejectWithValue(message);
            }

            return rejectWithValue(
                "Something went wrong"
            );

        }

    }
);