export interface TicketCardData {
    total_tickets: number;
    total_users: number;
    total_events: number;
    total_price: string;
}

export interface TicketCardResponse {
    success: boolean;
    message: string;
    data: TicketCardData;
}

export interface TicketCardState {
    loading: boolean;
    error: string | null;

    data: TicketCardData | null;
}