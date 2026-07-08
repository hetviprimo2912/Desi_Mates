export interface InterestListPayload {
    search: string;
    page_no: number;
    per_page: number;
}

export interface InterestItem {
    id: string;
    name: string;
    description: string;
    image: string;
    status: string;
}

export interface InterestPagination {
    current_page: number;
    per_page: number;
    total_records: number;
    total_pages: number;
    has_next_page: boolean;
}

export interface InterestListResponse {
    response_code: number;
    interest: InterestItem[];
    pagination: InterestPagination;
    message: string;
    status: string;
}

export interface InterestListState {
    loading: boolean;
    error: string | null;
    interest: InterestItem[];
    pagination: InterestPagination | null;
}