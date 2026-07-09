export interface SubscriberUserListPayload {
    search: string;
    page_no: number;
    per_page: number;
}

export interface SubscriberUserItem {
    id: number;
    username: string | null;
    name: string;
    email: string;
    country_code: string | null;
    phone: string;
    country: string;
    approved: number;
    lookinfor: string;
    created_at: string;
    subscriber_user: string;
}

export interface Pagination {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
}

export interface SubscriberUserListResponse {
    status: boolean;
    message: string;
    data: {
        users: SubscriberUserItem[];
        pagination: Pagination;
    };
}

export interface SubscriberUserListState {
    loading: boolean;
    error: string | null;
    users: SubscriberUserItem[];
    pagination: Pagination | null;
}
