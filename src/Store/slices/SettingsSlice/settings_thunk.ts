import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type { SettingsPayload, SettingsResponse } from "../../../Types/SettingsTypes/settings_types";

export const fetch_settings = createAsyncThunk<
    SettingsResponse,
    void,
    { rejectValue: string }
>(
    "settings/fetch_settings",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post("/update_privacy_policy");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);

export const update_settings = createAsyncThunk<
    SettingsResponse,
    SettingsPayload,
    { rejectValue: string }
>(
    "settings/update_settings",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("privacy_policy", payload.privacy_policy);
            formData.append("term_conditions", payload.term_conditions);
            formData.append("twilio_key", payload.twilio_key);
            formData.append("agora_key", payload.agora_key);
            formData.append("stripe_key", payload.stripe_key);
            formData.append("share_url", payload.share_url);
            formData.append("ios_share_url", payload.ios_share_url);
            formData.append("api_url", payload.api_url);
            formData.append("stripe_public_key", payload.stripe_public_key);
            formData.append("stripe_private_key", payload.stripe_private_key);
            const response = await axios.post("/update_privacy_policy", formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);
