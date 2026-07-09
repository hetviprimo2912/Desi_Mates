import { createSlice } from "@reduxjs/toolkit";
import { subscriber_user_list } from "./subscriber_user_list_thunk";
import type { SubscriberUserListState } from "../../../Types/SubscribedUsersType/subscriber_user_list_types";

const initialState: SubscriberUserListState = {
    loading: false,
    error: null,
    users: [],
    pagination: null,
};

const subscriberUserListSlice = createSlice({
    name: "subscriber_user_list",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(subscriber_user_list.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(subscriber_user_list.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data.users;
                state.pagination = action.payload.data.pagination;
            })
            .addCase(subscriber_user_list.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default subscriberUserListSlice.reducer;
