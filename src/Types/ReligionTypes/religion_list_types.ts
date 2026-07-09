export interface ReligionListPayload {
  search: string;
  page_no: number;
  per_page: number;
}

export interface ReligionItem {
  id: string;
  name: string;
  description: string;
}

export interface ReligionPagination {
  current_page: number;
  per_page: number;
  total_records: number;
  total_pages: number;
  has_next_page: boolean;
}

export interface ReligionListResponse {
  response_code: number;
  religion: ReligionItem[];
  pagination: ReligionPagination;
  message: string;
  status: string;
}

export interface ReligionListState {
  loading: boolean;
  error: string | null;
  religion: ReligionItem[];
  pagination: ReligionPagination | null;
}