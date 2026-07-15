import { createSlice } from "@reduxjs/toolkit";
import { get_username_list } from "./username_list_thunk";
import type { UsernameListState } from "../../../Types/ReportTypes/add_report_types";

const initialState: UsernameListState = {
    loading: false,
    error: null,
    users: [],
};

const usernameListSlice = createSlice({
    name: "username_list",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(get_username_list.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(get_username_list.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
            })
            .addCase(get_username_list.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default usernameListSlice.reducer;
