import { createSlice } from "@reduxjs/toolkit";

import { user_cards } from "./user_cards_thunk";

import type {
    UserCardsState,
} from "../../../Types/UsersTypes/user_cards_types";

const initialState: UserCardsState = {

    loading: false,

    error: null,

    cards: null,

};

const userCardsSlice = createSlice({

    name: "user_cards",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(user_cards.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(user_cards.fulfilled, (state, action) => {

                state.loading = false;

                state.cards = action.payload.data;

            })

            .addCase(user_cards.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload ||
                    "Something went wrong";

            });

    },

});

export default userCardsSlice.reducer;