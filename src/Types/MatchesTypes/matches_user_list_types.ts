export interface MatchesUserListPayload {
  search: string;
  page_no: number;
  per_page: number;
}

export interface MatchItem {
  id: number;
  from_user_id: string;
  from_user_name: string;
  to_user_id: string;
  to_user_name: string;
  created_at: string;
}

export interface MatchPagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface MatchesUserListResponse {
  status: boolean;
  message: string;
  data: {
    matches: MatchItem[];
    pagination: MatchPagination;
  };
}

export interface MatchesUserListState {
  loading: boolean;
  error: string | null;
  matches: MatchItem[];
  pagination: MatchPagination | null;
}