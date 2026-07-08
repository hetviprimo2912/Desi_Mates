export interface AllCategoryListPayload {
  search: string;
  page_no: number;
  per_page: number;
}

export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  status: string;
}

export interface CategoryPagination {
  current_page: number;
  per_page: number;
  total_records: number;
  total_pages: number;
  has_next_page: boolean;
}

export interface AllCategoryListResponse {
  response_code: number;
  category: CategoryItem[];
  pagination: CategoryPagination;
  message: string;
  status: string;
}

export interface AllCategoryListState {
  loading: boolean;
  error: string | null;
  category: CategoryItem[];
  pagination: CategoryPagination | null;
}