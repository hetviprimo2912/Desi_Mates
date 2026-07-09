export interface UserCardsPayload {}

export interface UserCardsData {
    total_users: number;
    approved_users: number;
    subscriber_users: number;
    online_users: number;
}

export interface UserCardsResponse {
    status: boolean;
    message: string;
    data: UserCardsData;
}

export interface UserCardsState {
    loading: boolean;
    error: string | null;
    cards: UserCardsData | null;
}