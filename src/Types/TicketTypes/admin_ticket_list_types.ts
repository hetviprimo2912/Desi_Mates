export interface AdminTicketListPayload {
    search: string;
    page_no: number;
    per_page: number;
}

export interface TicketItem {
    ticket_id: number;
    user_id: string;
    ticket_number: string;
    number_of_ticket: string;
    price: string;
    date: string;
    time: string;
    event_id: number;
    event_name: string;
    organized_by: string;
    location: string;
    event_image: string;
    username: string;
    email: string;
    phone: string;
    profile_pic: string;
}

export interface TicketPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface AdminTicketListResponse {
    success: boolean;
    message: string;
    data: TicketItem[];
    pagination: TicketPagination;
}

export interface AdminTicketListState {
    loading: boolean;
    error: string | null;

    tickets: TicketItem[];

    pagination: TicketPagination | null;
}