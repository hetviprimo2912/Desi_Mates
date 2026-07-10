export interface DeleteStarSignPayload {
    id: string;
}

export interface DeleteStarSignResponse {
    response_code: number;
    message: string;
    status: string;
}

export interface DeleteStarSignState {
    loading: boolean;
    error: string | null;
    success: boolean;
}
