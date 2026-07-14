export interface AddReligionPayload {
  name: string;
  description: string;
}

export interface AddedReligion {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface AddReligionResponse {
  response_code: number;
  message: string;
  status: string;
  religion: AddedReligion;
}

export interface AddReligionState {
  loading: boolean;
  error: string | null;
  religion: AddedReligion | null;
}