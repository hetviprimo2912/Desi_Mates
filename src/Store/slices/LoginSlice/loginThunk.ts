import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../lib/axiosConfiguration";
import type {
  LoginPayload,
  LoginResponse,
} from "../../../Types/LoginTypes/loginTypes";

export const loginAdmin = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  {
    rejectValue: string;
  }
>(
  "login/loginAdmin",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login", payload);

      return response.data;
    } catch (error: any) {
      const responseData = error.response?.data;

      const message =
        responseData?.message ??
        responseData?.error;

      if (typeof message === "string") {
        return rejectWithValue(message);
      }

      return rejectWithValue("Something went wrong");
    }
  }
);