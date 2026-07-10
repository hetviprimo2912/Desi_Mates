export interface EditCategoryPayload {
    id: string;
    name: string;
    description: string;
    status: string;
    image?: File | null;
}

export interface EditCategoryData {
    id: string;
    title: string;
    description: string;
    image: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface EditCategoryResponse {
    response_code: number;
    message: string;
    status: string;
    category: EditCategoryData;
}

export interface EditCategoryState {
    loading: boolean;
    error: string | null;
    category: EditCategoryData | null;
}