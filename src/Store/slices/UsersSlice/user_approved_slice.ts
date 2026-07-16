import { createSlice } from "@reduxjs/toolkit";

import { user_approved } from "./user_approved_thunk";

import type {
    UserApprovedState,
} from "../../../Types/UsersTypes/user_approved_types";

const initialState: UserApprovedState = {
    loading: false,
    error: null,
    success: false,
    message: "",
};

const userApprovedSlice = createSlice({
    name: "user_approved",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(user_approved.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(user_approved.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })

            .addCase(user_approved.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Something went wrong";
            });

    },

});

export default userApprovedSlice.reducer;