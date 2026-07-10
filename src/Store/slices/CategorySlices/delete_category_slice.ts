import { createSlice } from "@reduxjs/toolkit";

import { delete_category } from "./delete_category_thunk";

import type {
    DeleteCategoryState,
} from "../../../Types/CategoryTypes/delete_category_types";

const initialState: DeleteCategoryState = {

    loading: false,

    error: null,

    success: false,

};

const deleteCategorySlice = createSlice({

    name: "delete_category",

    initialState,

    reducers: {

        resetDeleteCategory(state) {

            state.loading = false;
            state.error = null;
            state.success = false;

        },

    },

    extraReducers: (builder) => {

        builder

            .addCase(delete_category.pending, (state) => {

                state.loading = true;
                state.error = null;
                state.success = false;

            })

            .addCase(delete_category.fulfilled, (state) => {

                state.loading = false;
                state.success = true;

            })

            .addCase(delete_category.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload || "Something went wrong";

            });

    },

});

export const {
    resetDeleteCategory,
} = deleteCategorySlice.actions;

export default deleteCategorySlice.reducer;