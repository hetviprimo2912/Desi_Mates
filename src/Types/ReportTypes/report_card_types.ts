export interface ReportCardResponse {
  status: boolean;
  message: string;
  data: {
    total_reports: number;
    total_users: number;
    this_month: number;
    resolved: number;
  };
}

export interface ReportCardState {
  loading: boolean;
  error: string | null;
  cards: ReportCardResponse["data"] | null;
}