export interface AddStarSignPayload {
    name: string;
    description: string;
}

export interface AddedStarSign {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface AddStarSignResponse {
    response_code: number;
    message: string;
    status: string;
    starsign: AddedStarSign;
}

export interface AddStarSignState {
    loading: boolean;
    error: string | null;
}
