export interface EventManagerCardData {
    total_managers: string;
    active_managers: string;
    new_this_month: string;
    total_events: string;
}

export interface EventManagerCardResponse {
    response_code: number;
    status: string;
    message: string;

    data: EventManagerCardData;
}

export interface EventManagerCardState {
    loading: boolean;
    error: string | null;

    data: EventManagerCardData | null;
}