import { createSlice } from "@reduxjs/toolkit";
import { subscriber_user_profile } from "./subscriber_user_profile_thunk";
import type { UserProfileState } from "../../../Types/UsersTypes/user_profile_types";

const initialState: UserProfileState = {
    loading: false,
    error: null,
    user: null,
    about: [],
    subscription_details: null,
};

const subscriberUserProfileSlice = createSlice({
    name: "subscriber_user_profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(subscriber_user_profile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(subscriber_user_profile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.about = action.payload.about;
                state.subscription_details = action.payload.subscription_details ?? null;
            })
            .addCase(subscriber_user_profile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default subscriberUserProfileSlice.reducer;
