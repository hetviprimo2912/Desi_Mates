export interface EditEventPayload {
    id: string;
    name: string;
    description: string;
    price: string;
    organized_by: string;
    cat_name: string;
    is_status: number;
    image: File | null;
    date?: string;
    time?: string;
}

export interface EditEventData {
    id: string;
    name: string;
    description: string;
    location: string;
    price: string;
    organized_by: string;
    cat_id: string;
    lat: string;
    lon: string;
    image: string;
    date: string;
    time: string;
    is_status: string;
    created_at: string | null;
    updated_at: string;
}

export interface EditEventResponse {
    response_code: number;
    message: string;
    status: string;
    event: EditEventData;
}

export interface EditEventState {
    loading: boolean;
    error: string | null;
    event: EditEventData | null;
}

export interface GetEventDetailsPayload {
    id: string;
}

export interface GetEventDetailsResponse {
    response_code: number;
    message: string;
    status: string;
    event: EditEventData;
}