import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { loginAdmin } from "./loginThunk";
import type { LoginState } from "../../../Types/LoginTypes/loginTypes";

const initialState: LoginState = {
  loading: false,
  error: null,
  token: null,
};

const loginSlice = createSlice({
  name: "login",

  initialState,

  reducers: {
    logout(state) {
      state.token = null;

      Cookies.remove("desimates_admin_token");
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;

        state.token = action.payload.token;

        Cookies.set(
          "desimates_admin_token",
          action.payload.token,
          {
            expires: 30,
            sameSite: "Strict",
            secure: import.meta.env.PROD,
          }
        );
      })

      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Login Failed";
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;