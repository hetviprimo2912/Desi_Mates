export interface DeleteEventManagerPayload {
    id: string | number;
}

export interface DeleteEventManagerResponse {
    response_code: number;
    status: string;
    message: string;
}

export interface DeleteEventManagerState {
    loading: boolean;
    error: string | null;

    success: boolean;
    message: string;
}