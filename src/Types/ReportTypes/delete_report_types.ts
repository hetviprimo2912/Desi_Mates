export interface DeleteReportPayload {
  id: number;
}

export interface DeleteReportResponse {
  response_code: number;
  message: string;
  status: string;
}

export interface DeleteReportState {
  loading: boolean;
  error: string | null;
  success: boolean;
}