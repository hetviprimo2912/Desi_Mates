export interface GetCategoryDetailsPayload {
    id: string;
}

export interface CategoryDetails {
    id: string;
    title: string;
    description: string;
    image: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface GetCategoryDetailsResponse {
    response_code: number;
    message: string;
    status: string;
    category: CategoryDetails;
}

export interface GetCategoryDetailsState {
    loading: boolean;
    error: string | null;
    category: CategoryDetails | null;
}