export interface ReligionCardPayload {}

export interface ReligionCardData {
  total_religions: number;
  profiles_with_religion: number;
  most_selected: string;
  least_selected: string;
}

export interface ReligionCardResponse {
  response_code: number;
  data: ReligionCardData;
  message: string;
  status: string;
}

export interface ReligionCardState {
  loading: boolean;
  error: string | null;
  cards: ReligionCardData | null;
}