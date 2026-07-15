// Username list (for dropdowns)
export interface UsernameListUser {
    id: number;
    name: string;
}

export interface UsernameListResponse {
    status: boolean;
    message: string;
    data: UsernameListUser[];
}

export interface UsernameListState {
    loading: boolean;
    error: string | null;
    users: UsernameListUser[];
}

// Add report
export interface AddReportPayload {
    user_id: string;
    peer_id: string;
    is_report: string;
}

export interface AddReportData {
    id: number;
    user_id: string;
    peer_id: string;
    is_report: string;
    created_at: string;
    updated_at: string;
}

export interface AddReportResponse {
    status: boolean;
    message: string;
    data: AddReportData;
}

export interface AddReportState {
    loading: boolean;
    error: string | null;
    success: boolean;
}
