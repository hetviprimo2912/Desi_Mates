export interface EventManagerListPayload {
    search: string;
    page_no: number;
    per_page: number;
}

export interface EventManager {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: string;
}

export interface EventManagerPagination {
    current_page: number;
    per_page: number;
    total_records: number;
    total_pages: number;
    has_next_page: boolean;
}

export interface EventManagerListResponse {
    response_code: number;
    status: string;
    message: string;

    event_manager: EventManager[];

    pagination: EventManagerPagination;
}

export interface EventManagerListState {
    loading: boolean;
    error: string | null;

    event_manager: EventManager[];

    pagination: EventManagerPagination | null;
}