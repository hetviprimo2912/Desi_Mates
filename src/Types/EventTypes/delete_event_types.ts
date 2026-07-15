export interface DeleteEventPayload {
  id: string;
}

export interface DeleteEventResponse {
  response_code: number;
  message: string;
  status: string;
}

export interface DeleteEventState {
  loading: boolean;
  error: string | null;
  success: boolean;
}
