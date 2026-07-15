export interface MatchesCardResponse {
  status: boolean;
  message: string;
  data: {
    total_matches: number;
    total_users: number;
    this_month: number;
    match_rate: string;
  };
}

export interface MatchesCardState {
  loading: boolean;
  error: string | null;
  cards: MatchesCardResponse["data"] | null;
}