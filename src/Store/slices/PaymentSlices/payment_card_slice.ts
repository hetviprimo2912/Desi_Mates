import { createSlice } from "@reduxjs/toolkit";

import { payment_card } from "./payment_card_thunk";

import type {
  PaymentCardState,
} from "../../../Types/PaymentTypes/payment_card_types";

const initialState: PaymentCardState = {
  loading: false,
  error: null,
  cards: null,
};

const paymentCardSlice = createSlice({
  name: "payment_card",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(payment_card.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(payment_card.fulfilled, (state, action) => {
        state.loading = false;

        state.cards = action.payload.data;
      })

      .addCase(payment_card.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default paymentCardSlice.reducer;