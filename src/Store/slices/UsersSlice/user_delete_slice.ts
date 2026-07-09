import { createSlice } from "@reduxjs/toolkit";
import { user_delete } from "./user_delete_thunk";
import type { UserDeleteState } from "../../../Types/UsersTypes/user_delete_types";

const initialState: UserDeleteState = {
    loading: false,
    success: false,
    message: "",
    error: null,
};

const userDeleteSlice = createSlice({
    name: "user_delete",
    initialState,
    reducers: {
        resetDeleteState: (state) => {
            state.loading = false;
            state.success = false;
            state.message = "";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(user_delete.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })

            .addCase(user_delete.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })

            .addCase(user_delete.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export const {
    resetDeleteState,
} = userDeleteSlice.actions;

export default userDeleteSlice.reducer;