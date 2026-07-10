import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./slices/LoginSlice/loginSlice";
import usersListReducer from "./slices/UsersSlice/users_list_slice";
import allCategoryListReducer from "./slices/CategorySlices/all_category_list_slice";
import interestListReducer from "./slices/InterestSlice/interest_list_slice";
import addInterestReducer from "./slices/InterestSlice/add_interest_slice";
import editInterestReducer from "./slices/InterestSlice/edit_interest_slice";
import deleteInterestReducer from "./slices/InterestSlice/delete_interest_slice";
import starsignListReducer from "./slices/StarSlices/starsign_list_slice";
import addStarsignReducer from "./slices/StarSlices/add_starsign_slice";
import editStarsignReducer from "./slices/StarSlices/edit_starsign_slice";
import deleteStarsignReducer from "./slices/StarSlices/delete_starsign_slice";
import starsignCardReducer from "./slices/StarSlices/starsign_card_slice";
import category_card from "./slices/CategorySlices/category_card_slice";
import religionListReducer from "./slices/ReligionSlices/religion_list_slice";
import userCardsReducer from "./slices/UsersSlice/user_cards_slice";
import userProfileReducer from "./slices/UsersSlice/user_profile_slice";
import user_delete from "./slices/UsersSlice/user_delete_slice";
import subscriberUserListReducer from "./slices/SubscribesUsersSlice/subscriber_user_list_slice";
import subscriberUserCardReducer from "./slices/SubscribesUsersSlice/subscriber_user_card_slice";
import toggle_category from "./slices/CategorySlices/toggle_category_slice";
import add_category from "./slices/CategorySlices/add_category_slice";
import edit_category from "./slices/CategorySlices/edit_category_slice";
import getCategoryDetailsReducer
  from "./slices/CategorySlices/get_category_details_slice";
import delete_category
  from "./slices/CategorySlices/delete_category_slice";

export const store = configureStore({
  reducer: {
    login: loginReducer,

    users_list: usersListReducer,
    user_cards: userCardsReducer,
    user_profile: userProfileReducer,
    user_delete,

    category_list: allCategoryListReducer,
    category_card,
    toggle_category,
    add_category,
    edit_category,
    get_category_details: getCategoryDetailsReducer,
    delete_category,

    interest_list: interestListReducer,
    add_interest: addInterestReducer,
    edit_interest: editInterestReducer,
    delete_interest: deleteInterestReducer,

    starsign_list: starsignListReducer,
    add_starsign: addStarsignReducer,
    edit_starsign: editStarsignReducer,
    delete_starsign: deleteStarsignReducer,
    starsign_card: starsignCardReducer,

    religion_list: religionListReducer,

    subscriber_user_list: subscriberUserListReducer,
    subscriber_user_card: subscriberUserCardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;