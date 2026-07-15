import { createSlice } from "@reduxjs/toolkit";

import { payment_user_list } from "./payment_user_list_thunk";

import type {
  PaymentUserListState,
} from "../../../Types/PaymentTypes/payment_user_list_types";

const initialState: PaymentUserListState = {
  loading: false,
  error: null,
  users: [],
  pagination: null,
};

const paymentUserListSlice = createSlice({
  name: "payment_user_list",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(payment_user_list.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(payment_user_list.fulfilled, (state, action) => {
        state.loading = false;

        state.users = action.payload.data.users;

        state.pagination = action.payload.data.pagination;
      })

      .addCase(payment_user_list.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default paymentUserListSlice.reducer;