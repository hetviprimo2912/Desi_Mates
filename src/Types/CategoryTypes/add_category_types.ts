export interface AddCategoryPayload {
  name: string;
  description: string;
  image: File;
  status: string;
}

export interface AddedCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AddCategoryResponse {
  response_code: number;
  message: string;
  status: string;
  category: AddedCategory;
}

export interface AddCategoryState {
  loading: boolean;
  error: string | null;
}