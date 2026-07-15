export interface SettingsPayload {
    privacy_policy: string;
    term_conditions: string;
    twilio_key: string;
    agora_key: string;
    stripe_key: string;
    share_url: string;
    ios_share_url: string;
    api_url: string;
    stripe_public_key: string;
    stripe_private_key: string;
}

export interface SettingsData {
    privacy_policy: string;
    term_conditions: string;
    twilio_key: string;
    agora_key: string;
    stripe_key: string;
    share_url: string;
    ios_share_url: string;
    api_url: string;
    stripe_public_key: string;
    stripe_private_key: string;
}

export interface SettingsResponse {
    response_code: number;
    status: string;
    message: string;
    data: SettingsData;
}

export interface SettingsState {
    loading: boolean;
    saving: boolean;
    error: string | null;
    data: SettingsData | null;
}
