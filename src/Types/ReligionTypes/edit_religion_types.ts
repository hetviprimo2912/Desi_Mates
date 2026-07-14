export interface EditReligionPayload {
    id: string;
    name: string;
    description: string;
}

export interface EditReligionData {
    id: string;
    name: string;
    description: string;
    created_at: string | null;
    updated_at: string;
}

export interface EditReligionResponse {
    response_code: number;
    message: string;
    status: string;
    religion: EditReligionData;
}

export interface EditReligionState {
    loading: boolean;
    error: string | null;
    religion: EditReligionData | null;
}

export interface GetReligionDetailsPayload {
    id: string;
}

export interface GetReligionDetailsResponse {
    response_code: number;
    message: string;
    status: string;
    religion: EditReligionData;
}