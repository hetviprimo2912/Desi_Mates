export interface DeleteInterestPayload {
    id: string;
}

export interface DeleteInterestResponse {
    response_code: number;
    message: string;
    status: string;
}

export interface DeleteInterestState {
    loading: boolean;
    error: string | null;
    success: boolean;
}
