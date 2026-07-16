export interface UserImageDeletePayload {
    user_id: number;
    image_filed: string;
}

export interface UserImageDeleteResponse {
    status: string;
    message: string;
}

export interface UserImageDeleteState {
    loading: boolean;
    error: string | null;
    success: boolean;
    message: string;
}