export interface EditInterestPayload {
    id: string;
    name: string;
    description: string;
    status: string;
    image?: File | null;
}

export interface EditInterestData {
    id: string;
    name: string;
    description: string;
    image: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface EditInterestResponse {
    response_code: number;
    message: string;
    status: string;
    interest: EditInterestData;
}

export interface EditInterestState {
    loading: boolean;
    error: string | null;
    interest: EditInterestData | null;
}

export interface GetInterestDetailsPayload {
    id: string;
}

export interface GetInterestDetailsResponse {
    response_code: number;
    message: string;
    status: string;
    interest: EditInterestData;
}

export interface GetInterestDetailsState {
    loading: boolean;
    error: string | null;
    interest: EditInterestData | null;
}
