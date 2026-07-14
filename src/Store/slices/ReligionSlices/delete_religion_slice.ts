import { createSlice } from "@reduxjs/toolkit";
import { delete_religion } from "./delete_religion_thunk";
import type {
    DeleteReligionState,
} from "../../../Types/ReligionTypes/delete_religion_types";

const initialState: DeleteReligionState = {
    loading: false,
    error: null,
};

const deleteReligionSlice = createSlice({
    name: "delete_religion",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(delete_religion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(delete_religion.fulfilled, (state) => {
                state.loading = false;
            })

            .addCase(delete_religion.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload ||
                    "Something went wrong";
            });
    },
});

export default deleteReligionSlice.reducer;