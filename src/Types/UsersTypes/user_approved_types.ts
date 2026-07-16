export interface UserApprovedPayload {
    user_id: number;
    is_approved: number;
}

export interface UserApprovedResponse {
    status: string;
    message: string;
}

export interface UserApprovedState {
    loading: boolean;
    error: string | null;
    success: boolean;
    message: string;
}