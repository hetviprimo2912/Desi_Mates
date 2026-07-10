export interface ToggleCategoryPayload {
  id: string;
}

export interface ToggleCategoryData {
  id: string;
  status: string;
}

export interface ToggleCategoryResponse {
  response_code: number;
  message: string;
  status: string;
  data: ToggleCategoryData;
}

export interface ToggleCategoryState {
  loading: boolean;
  error: string | null;
}