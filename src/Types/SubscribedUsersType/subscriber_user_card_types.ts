export interface SubscriberUserCardData {
    total_subscriber: number;
    active_users: number;
    premium_plans: number;
    expired_plans: number;
}

export interface SubscriberUserCardResponse {
    status: boolean;
    message: string;
    data: SubscriberUserCardData;
}

export interface SubscriberUserCardState {
    loading: boolean;
    error: string | null;
    cards: SubscriberUserCardData | null;
}
