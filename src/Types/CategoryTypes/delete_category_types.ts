export interface DeleteCategoryPayload {
    id: string;
}

export interface DeleteCategoryResponse {
    response_code: number;
    message: string;
    status: string;
}

export interface DeleteCategoryState {
    loading: boolean;
    error: string | null;
    success: boolean;
}