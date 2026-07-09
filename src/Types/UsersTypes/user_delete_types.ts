export interface UserDeletePayload {
    user_id: number;
}

export interface UserDeleteResponse {
    status: string;
    message: string;
}

export interface UserDeleteState {
    loading: boolean;
    success: boolean;
    message: string;
    error: string | null;
}