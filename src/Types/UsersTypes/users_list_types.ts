export interface UsersListPayload {
  search: string;
  page_no: number;
  per_page: number;
}

export interface UserItem {
  id: number;
  username: string | null;
  name: string;
  email: string;
  created_at: string;
  country_code: string | null;
  phone: string;
  country: string;
  approved: number;
  lookinfor: string;
}

export interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface UsersListResponse {
  status: boolean;
  message: string;
  data: {
    users: UserItem[];
    pagination: Pagination;
  };
}

export interface UsersListState {
  loading: boolean;
  error: string | null;
  users: UserItem[];
  pagination: Pagination | null;
}