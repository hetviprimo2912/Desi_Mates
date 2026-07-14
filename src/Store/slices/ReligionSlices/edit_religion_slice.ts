import { createSlice } from "@reduxjs/toolkit";

import { edit_religion } from "./edit_religion_thunk";

import { get_religion_details } from "./get_religion_details_thunk";

import type {
    EditReligionState,
} from "../../../Types/ReligionTypes/edit_religion_types";

const initialState: EditReligionState = {
    loading: false,
    error: null,
    religion: null,
};

const editReligionSlice = createSlice({
    name: "edit_religion",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(get_religion_details.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(
                get_religion_details.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.religion =
                        action.payload.religion;
                }
            )

            .addCase(
                get_religion_details.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error =
                        action.payload ||
                        "Something went wrong";
                }
            )

            .addCase(edit_religion.pending, (state) => {
                state.error = null;
            })
            .addCase(
                edit_religion.fulfilled,
                (state, action) => {
                    state.religion = action.payload.religion;
                }
            )

            .addCase(
                edit_religion.rejected,
                (state, action) => {
                    state.error =
                        action.payload ||
                        "Something went wrong";
                }
            );
    },
});

export default editReligionSlice.reducer;