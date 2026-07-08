import { createSlice } from "@reduxjs/toolkit";

import { interest_list } from "./interest_list_thunk";

import type {
    InterestListState,
} from "../../../Types/InterestTypes/interest_list_types";

const initialState: InterestListState = {

    loading: false,

    error: null,

    interest: [],

    pagination: null,

};

const interestListSlice = createSlice({

    name: "interest_list",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(
                interest_list.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                interest_list.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.interest =
                        action.payload.interest;

                    state.pagination =
                        action.payload.pagination;

                }
            )

            .addCase(
                interest_list.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload ||
                        "Something went wrong";

                }
            );

    },

});

export default interestListSlice.reducer;