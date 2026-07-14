export interface DeleteReligionPayload {
    id: string;
}

export interface DeleteReligionResponse {
    response_code: number;
    message: string;
    status: string;
}

export interface DeleteReligionState {
    loading: boolean;
    error: string | null;
}