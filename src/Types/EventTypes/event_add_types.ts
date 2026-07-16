export interface EventAddPayload {
    name: string;
    description: string;
    image: File;
    price: string;
    organized_by: string;
    cat_name: string;
    status: number;
    date: string;
    time: string;
}

export interface EventAddResponse {
    response_code: number;
    status: string;
    message: string;
}

export interface EventAddState {
    loading: boolean;
    error: string | null;
    success: boolean;
    message: string;
}