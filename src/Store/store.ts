import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./slices/LoginSlice/loginSlice";
import usersListReducer from "./slices/UsersSlice/users_list_slice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    users_list: usersListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;