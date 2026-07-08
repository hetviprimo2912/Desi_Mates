export interface StarSignListPayload {
    search: string;
    page_no: number;
    per_page: number;
}

export interface StarSignItem {
    id: string;
    name: string;
    description: string;
}

export interface StarSignPagination {
    current_page: number;
    per_page: number;
    total_records: number;
    total_pages: number;
    has_next_page: boolean;
}

export interface StarSignListResponse {
    response_code: number;
    starsign: StarSignItem[];
    pagination: StarSignPagination;
    message: string;
    status: string;
}

export interface StarSignListState {
    loading: boolean;
    error: string | null;
    starsign: StarSignItem[];
    pagination: StarSignPagination | null;
}
