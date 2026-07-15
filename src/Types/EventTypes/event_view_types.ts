export interface EventViewPayload {
  id: string;
}

export interface EventViewItem {
  id: string;
  name: string;
  description: string;
  location: string;
  price: string;
  organized_by: string;
  cat_id: string;
  lat: string;
  lon: string;
  image: string;
  date: string;
  time: string;
  count: number;
  is_status: string;
  created_at: string;
  updated_at: string;
}

export interface EventViewResponse {
  response_code: number;
  message: string;
  status: string;
  event: EventViewItem;
}

export interface EventViewState {
  loading: boolean;
  error: string | null;
  event: EventViewItem | null;
}
