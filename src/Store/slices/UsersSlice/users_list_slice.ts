import { createSlice } from "@reduxjs/toolkit";

import { users_list } from "./users_list_thunk";

import type {
  UsersListState,
} from "../../../Types/UsersTypes/users_list_types";

const initialState: UsersListState = {
  loading: false,
  error: null,
  users: [],
  pagination: null,
};

const usersListSlice = createSlice({
  name: "users_list",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(users_list.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(users_list.fulfilled, (state, action) => {
        state.loading = false;

        state.users = action.payload.data.users;

        state.pagination =
          action.payload.data.pagination;
      })

      .addCase(users_list.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default usersListSlice.reducer;