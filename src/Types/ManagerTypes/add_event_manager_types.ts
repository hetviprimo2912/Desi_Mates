export interface AddEventManagerPayload {
    name: string;
    email: string;
    password: string;
}

export interface AddEventManagerItem {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface AddEventManagerResponse {
    response_code: number;
    status: string;
    message: string;
    event_manager: AddEventManagerItem;
}

export interface AddEventManagerState {
    loading: boolean;
    error: string | null;
    success: boolean;
}
