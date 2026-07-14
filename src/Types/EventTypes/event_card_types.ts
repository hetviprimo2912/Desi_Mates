export interface EventCardData {
  total_events: string;
  total_joined: string;
  total_category: string;
  most_popular: string;
}

export interface EventCardResponse {
  response_code: number;
  status: string;
  message: string;
  data: EventCardData;
}

export interface EventCardState {
  loading: boolean;
  error: string | null;
  data: EventCardData | null;
}