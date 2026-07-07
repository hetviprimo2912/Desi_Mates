export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
}

export interface LoginState {
    loading: boolean;
    error: string | null;
    token: string | null;
}