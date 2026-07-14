export interface EventListPayload {
  search: string;
  page_no: number;
  per_page: number;
}

export interface EventItem {
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

export interface EventPagination {
  current_page: number;
  per_page: number;
  total_records: number;
  total_pages: number;
  has_next_page: boolean;
}

export interface EventListResponse {
  response_code: number;
  status: string;
  message: string;
  event: EventItem[];
  pagination: EventPagination;
}

export interface EventListState {
  loading: boolean;
  error: string | null;
  events: EventItem[];
  pagination: EventPagination | null;
}