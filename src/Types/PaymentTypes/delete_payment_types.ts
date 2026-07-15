export interface DeletePaymentPayload {
  id: number;
}

export interface DeletePaymentResponse {
  response_code: number;
  message: string;
  status: string;
}

export interface DeletePaymentState {
  loading: boolean;
  error: string | null;
  success: boolean;
}