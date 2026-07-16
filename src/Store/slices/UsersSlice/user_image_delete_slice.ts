import { createSlice } from "@reduxjs/toolkit";

import { user_image_delete } from "./user_image_delete_thunk";

import type {
    UserImageDeleteState,
} from "../../../Types/UsersTypes/user_image_delete_types";

const initialState: UserImageDeleteState = {
    loading: false,
    error: null,
    success: false,
    message: "",
};

const userImageDeleteSlice = createSlice({
    name: "user_image_delete",

    initialState,

    reducers: {
        resetUserImageDelete: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.message = "";
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(user_image_delete.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(user_image_delete.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })

            .addCase(user_image_delete.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error =
                    action.payload || "Something went wrong";
            });
    },
});

export const {
    resetUserImageDelete,
} = userImageDeleteSlice.actions;

export default userImageDeleteSlice.reducer;