export interface EditEventManagerPayload {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface EditEventManagerItem {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface EditEventManagerResponse {
    response_code: number;
    status: string;
    message: string;
    event_manager: EditEventManagerItem;
}

export interface EditEventManagerState {
    loading: boolean;
    error: string | null;
    success: boolean;
    manager: EditEventManagerItem | null;
}
