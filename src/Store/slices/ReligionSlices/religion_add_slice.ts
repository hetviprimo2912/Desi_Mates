import { createSlice } from "@reduxjs/toolkit";

import { add_religion } from "./religion_add_thunk";

import type {
  AddReligionState,
} from "../../../Types/ReligionTypes/religion_add_types";

const initialState: AddReligionState = {
  loading: false,
  error: null,
  religion: null,
};

const addReligionSlice = createSlice({
  name: "add_religion",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(add_religion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(add_religion.fulfilled, (state, action) => {
        state.loading = false;
        state.religion = action.payload.religion;
      })

      .addCase(add_religion.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default addReligionSlice.reducer;