export interface StarsignCardData {
    total_star_signs: number;
    profiles_with_star_sign: number;
    most_popular_sign: string;
    least_popular_sign: string;
}

export interface StarsignCardResponse {
    response_code: number;
    data: StarsignCardData;
    message: string;
    status: string;
}

export interface StarsignCardState {
    loading: boolean;
    error: string | null;
    data: StarsignCardData | null;
}
