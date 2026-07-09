import { createSlice } from "@reduxjs/toolkit";
import { subscriber_user_card } from "./subscriber_user_card_thunk";
import type { SubscriberUserCardState } from "../../../Types/SubscribedUsersType/subscriber_user_card_types";

const initialState: SubscriberUserCardState = {
    loading: false,
    error: null,
    cards: null,
};

const subscriberUserCardSlice = createSlice({
    name: "subscriber_user_card",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(subscriber_user_card.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(subscriber_user_card.fulfilled, (state, action) => {
                state.loading = false;
                state.cards = action.payload.data;
            })
            .addCase(subscriber_user_card.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default subscriberUserCardSlice.reducer;
