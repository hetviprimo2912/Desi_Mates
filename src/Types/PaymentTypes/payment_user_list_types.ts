export interface PaymentUserListPayload {
  search: string;
  page_no: number;
  per_page: number;
}

export interface PaymentUser {
  id: number;
  payment_id: number;
  username: string | null;
  name: string;
  email: string;
  price: string;
  payment_method: string;
  subscriber_user: string;
}

export interface PaymentPagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface PaymentUserListResponse {
  status: boolean;
  message: string;
  data: {
    users: PaymentUser[];
    pagination: PaymentPagination;
  };
}

export interface PaymentUserListState {
  loading: boolean;
  error: string | null;
  users: PaymentUser[];
  pagination: PaymentPagination | null;
}