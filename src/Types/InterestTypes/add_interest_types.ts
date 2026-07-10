export interface AddInterestPayload {
    name: string;
    description: string;
    image: File;
    status: string;
}

export interface AddedInterest {
    id: string;
    name: string;
    description: string;
    image: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface AddInterestResponse {
    response_code: number;
    message: string;
    status: string;
    interest: AddedInterest;
}

export interface AddInterestState {
    loading: boolean;
    error: string | null;
}
