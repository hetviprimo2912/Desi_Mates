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
import subscriberUserProfileReducer from "./slices/UsersSlice/subscriber_user_profile_slice";
import subscriberUserListReducer from "./slices/SubscribesUsersSlice/subscriber_user_list_slice";
import subscriberUserCardReducer from "./slices/SubscribesUsersSlice/subscriber_user_card_slice";
import toggle_category from "./slices/CategorySlices/toggle_category_slice";
import add_category from "./slices/CategorySlices/add_category_slice";
import edit_category from "./slices/CategorySlices/edit_category_slice";
import getCategoryDetailsReducer from "./slices/CategorySlices/get_category_details_slice";
import delete_category from "./slices/CategorySlices/delete_category_slice";
import religion_card from "./slices/ReligionSlices/religion_card_slice";
import religion_add from "./slices/ReligionSlices/religion_add_slice";
import editReligionReducer from "./slices/ReligionSlices/edit_religion_slice";
import delete_religion from "./slices/ReligionSlices/delete_religion_slice";
import event_list from "./slices/EventSlices/event_list_slice";
import event_card from "./slices/EventSlices/event_card_slice";
import event_add from "./slices/EventSlices/event_add_slice";
import edit_event from "./slices/EventSlices/edit_event_slice";
import event_view from "./slices/EventSlices/event_view_slice";
import delete_event from "./slices/EventSlices/delete_event_slice";
import add_event_manager from "./slices/MangerSlices/add_event_manager_slice";
import edit_event_manager from "./slices/MangerSlices/edit_event_manager_slice";
import settings from "./slices/SettingsSlice/settings_slice";
import eventManagerListReducer from "./slices/MangerSlices/event_manager_list_slice";
import eventManagerCardReducer from "./slices/MangerSlices/event_manager_card_slice";
import deleteEventManagerReducer from "./slices/MangerSlices/delete_event_manager_slice";
import adminTicketListReducer from "./slices/TicketSlices/admin_ticket_list_slice";
import ticketCardReducer from "./slices/TicketSlices/ticket_card_slice";
import deleteTicketReducer from "./slices/TicketSlices/delete_ticket_slice";
import paymentUserListReducer from "./slices/PaymentSlices/payment_user_list_slice";
import paymentCardReducer from "./slices/PaymentSlices/payment_card_slice";
import deletePaymentReducer from "./slices/PaymentSlices/delete_payment_slice";
import matchesUserListReducer from "./slices/MatchesSlices/matches_user_list_slice";
import matchesCardReducer from "./slices/MatchesSlices/matches_card_slice";
import reportListReducer from "./slices/ReportSlices/report_list_slice";
import reportCardReducer from "./slices/ReportSlices/report_card_slice";
import deleteReportReducer from "./slices/ReportSlices/delete_report_slice";
import addReportReducer from "./slices/ReportSlices/add_report_slice";
import usernameListReducer from "./slices/ReportSlices/username_list_slice";
import dashboardReducer from "./slices/DashboardSlices/dashboard_slice";

export const store = configureStore({
  reducer: {
    login: loginReducer,

    users_list: usersListReducer,
    user_cards: userCardsReducer,
    user_profile: userProfileReducer,
    user_delete,
    subscriber_user_profile: subscriberUserProfileReducer,

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
    religion_card,
    religion_add,
    delete_religion,
    edit_religion: editReligionReducer,

    subscriber_user_list: subscriberUserListReducer,
    subscriber_user_card: subscriberUserCardReducer,

    event_list,
    event_card,
    event_add,
    edit_event,
    event_view,
    delete_event,
    add_event_manager,
    edit_event_manager,
    settings,

    event_manager_list: eventManagerListReducer,
    event_manager_card: eventManagerCardReducer,
    delete_event_manager: deleteEventManagerReducer,

    admin_ticket_list: adminTicketListReducer,
    ticket_card: ticketCardReducer,
    delete_ticket: deleteTicketReducer,

    payment_user_list: paymentUserListReducer,
    payment_card: paymentCardReducer,
    delete_payment: deletePaymentReducer,

    matches_user_list: matchesUserListReducer,
    matches_card: matchesCardReducer,

    report_list: reportListReducer,
    report_card: reportCardReducer,
    delete_report: deleteReportReducer,
    add_report: addReportReducer,
    username_list: usernameListReducer,

    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;