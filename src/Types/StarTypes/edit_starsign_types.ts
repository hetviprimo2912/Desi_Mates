export interface EditStarSignPayload {
    id: string;
    name: string;
    description: string;
}

export interface EditStarSignData {
    id: string;
    name: string;
    description: string;
    created_at: string | null;
    updated_at: string;
}

export interface EditStarSignResponse {
    response_code: number;
    message: string;
    status: string;
    starsign: EditStarSignData;
}

export interface EditStarSignState {
    loading: boolean;
    error: string | null;
    starsign: EditStarSignData | null;
}

export interface GetStarSignDetailsPayload {
    id: string;
}

export interface GetStarSignDetailsResponse {
    response_code: number;
    message: string;
    status: string;
    starsign: EditStarSignData;
}
