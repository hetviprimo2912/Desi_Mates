export interface DeleteTicketPayload {
     id: number;
}

export interface DeleteTicketResponse {
    success: boolean;
    message: string;
}

export interface DeleteTicketState {
    loading: boolean;
    error: string | null;

    success: boolean;

    message: string;
}