import { createSlice } from "@reduxjs/toolkit";

import { delete_payment } from "./delete_payment_thunk";

import type {
  DeletePaymentState,
} from "../../../Types/PaymentTypes/delete_payment_types";

const initialState: DeletePaymentState = {
  loading: false,
  error: null,
  success: false,
};

const deletePaymentSlice = createSlice({
  name: "delete_payment",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(delete_payment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(delete_payment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(delete_payment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default deletePaymentSlice.reducer;