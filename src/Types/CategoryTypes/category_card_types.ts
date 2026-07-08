export interface CategoryCardData {
    total_category: string;
    active_category: string;
    inactive_category: string;
    recently_added: string;
}

export interface CategoryCardResponse {
    response_code: number;
    data: CategoryCardData;
    message: string;
    status: string;
}