export interface GraphDataPoint {
    date: string;
    users: number;
    subscriber_users: number;
}

export interface LatestUser {
    id: number;
    username: string | null;
    name: string;
    email: string;
    created_at: string;
    country_code: string | null;
    phone: string;
    country: string;
    approved: number;
    profile_pic: string;
}

export interface TicketStat {
    count: number;
    percentage: number;
}

export interface TopEvent {
    id: number;
    name: string;
    image: string;
    cat_id: string;
    max_ticket: string;
    price: string;
    sold_ticket: number;
}

export interface NewEvent {
    id: string;
    name: string;
    description: string;
    image: string;
    price: string;
    location: string;
    organized_by: string;
    cat_id: string;
    lat: string;
    lon: string;
    is_likes: number;
    date: string;
    time: string;
    count: number;
    profile_pic: string[];
}

export interface GrowthOverview {
    total_users: TicketStat;
    total_tickets: TicketStat;
    total_events: TicketStat;
    subscribed_users: TicketStat;
}

export interface MixedStatPoint {
    month: string;
    events: number;
    users: number;
    subscribed_users: number;
}

export interface DashboardData {
    graph_data: GraphDataPoint[];
    latest_users: LatestUser[];
    monthly_ticket_sold: TicketStat;
    annual_ticket_sold: TicketStat;
    topEvent: TopEvent;
    new_event: NewEvent[];
    growth_overview: GrowthOverview;
    mixed_statistics: MixedStatPoint[];
}

export interface DashboardResponse {
    success: boolean;
    message: string;
    data: DashboardData;
}

export interface DashboardState {
    loading: boolean;
    error: string | null;
    data: DashboardData | null;
}
