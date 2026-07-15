export interface PaymentCardResponse {
  status: boolean;
  message: string;
  data: {
    total_payment: number;
    total_revenue: number;
    unique_users: number;
    this_month_revenue: number;
  };
}

export interface PaymentCardState {
  loading: boolean;
  error: string | null;
  cards: PaymentCardResponse["data"] | null;
}