export interface ReportListPayload {
  search: string;
  page_no: number;
  per_page: number;
}

export interface ReportItem {
  id: number;
  from_user_id: string;
  from_user_name: string;
  to_user_id: string;
  to_user_name: string;
  report_reason: string;
  created_at: string;
}

export interface ReportPagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface ReportListResponse {
  status: boolean;
  message: string;
  data: {
    reports: ReportItem[];
    pagination: ReportPagination;
  };
}

export interface ReportListState {
  loading: boolean;
  error: string | null;
  reports: ReportItem[];
  pagination: ReportPagination | null;
}