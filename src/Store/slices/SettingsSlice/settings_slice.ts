import { createSlice } from "@reduxjs/toolkit";
import { fetch_settings, update_settings } from "./settings_thunk";
import type { SettingsState } from "../../../Types/SettingsTypes/settings_types";

const initialState: SettingsState = {
    loading: false,
    saving: false,
    error: null,
    data: null,
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetch_settings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetch_settings.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(fetch_settings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })

            .addCase(update_settings.pending, (state) => {
                state.saving = true;
                state.error = null;
            })
            .addCase(update_settings.fulfilled, (state, action) => {
                state.saving = false;
                state.data = action.payload.data;
            })
            .addCase(update_settings.rejected, (state, action) => {
                state.saving = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default settingsSlice.reducer;
