import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./slices/LoginSlice/loginSlice";
import usersListReducer from "./slices/UsersSlice/users_list_slice";
import allCategoryListReducer from "./slices/CategorySlices/all_category_list_slice";
import interestListReducer from "./slices/InterestSlice/interest_list_slice";
import starsignListReducer from "./slices/StarSlices/starsign_list_slice";
import category_card from "./slices/CategorySlices/category_card_slice";
import religionListReducer from "./slices/ReligionSlices/religion_list_slice";
import userCardsReducer from "./slices/UsersSlice/user_cards_slice";
import userProfileReducer from "./slices/UsersSlice/user_profile_slice";
import user_delete from "./slices/UsersSlice/user_delete_slice";

export const store = configureStore({
  reducer: {
    login: loginReducer,

    users_list: usersListReducer,
    user_cards: userCardsReducer,
    user_profile: userProfileReducer,
    user_delete,

    category_list: allCategoryListReducer,
    category_card,

    interest_list: interestListReducer,

    starsign_list: starsignListReducer,

    religion_list: religionListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;