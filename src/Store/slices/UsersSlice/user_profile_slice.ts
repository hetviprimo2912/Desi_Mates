import { createSlice } from "@reduxjs/toolkit";

import { user_profile } from "./user_profile_thunk";

import type {
    UserProfileState,
} from "../../../Types/UsersTypes/user_profile_types";

const initialState: UserProfileState = {
    loading: false,
    error: null,
    user: null,
    about: [],
};

const userProfileSlice = createSlice({
    name: "user_profile",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(user_profile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(user_profile.fulfilled, (state, action) => {
                state.loading = false;

                state.user = action.payload.data;

                state.about = action.payload.about;
            })

            .addCase(user_profile.rejected, (state, action) => {
                state.loading = false;

                state.error =
                    action.payload || "Something went wrong";
            });
    },
});

export default userProfileSlice.reducer;