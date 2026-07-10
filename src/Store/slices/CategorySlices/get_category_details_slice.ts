import { createSlice } from "@reduxjs/toolkit";

import { get_category_details } from "./get_category_details_thunk";

import type {
    GetCategoryDetailsState,
} from "../../../Types/CategoryTypes/get_category_details_types";

const initialState: GetCategoryDetailsState = {

    loading: false,

    error: null,

    category: null,

};

const getCategoryDetailsSlice = createSlice({

    name: "get_category_details",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(get_category_details.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(get_category_details.fulfilled, (state, action) => {

                state.loading = false;

                state.category = action.payload.category;

            })

            .addCase(get_category_details.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload || "Something went wrong";

            });

    },

});

export default getCategoryDetailsSlice.reducer;