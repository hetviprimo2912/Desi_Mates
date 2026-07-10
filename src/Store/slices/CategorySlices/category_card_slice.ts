import { createSlice } from "@reduxjs/toolkit";
import { category_card } from "./category_card_thunk";
import { toggle_category } from "./toggle_category_thunk";
import type {
    CategoryCardData,
} from "../../../Types/CategoryTypes/category_card_types";

interface CategoryCardState {

    cards: CategoryCardData;

    loading: boolean;

    error: string | null;

}

const initialState: CategoryCardState = {

    cards: {

        total_category: "0",

        active_category: "0",

        inactive_category: "0",

        recently_added: "0",

    },

    loading: false,

    error: null,

};

const categoryCardSlice = createSlice({

    name: "category_card",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(category_card.pending, (state) => {

                state.loading = true;

            })

            .addCase(category_card.fulfilled, (state, action) => {

                state.loading = false;

                state.cards = action.payload;

            })
            .addCase(toggle_category.fulfilled, (state, action) => {

                const status = action.payload.data.status;

                if (status === "1") {

                    state.cards.active_category = (
                        Number(state.cards.active_category) + 1
                    ).toString();

                    state.cards.inactive_category = (
                        Number(state.cards.inactive_category) - 1
                    ).toString();

                } else {

                    state.cards.active_category = (
                        Number(state.cards.active_category) - 1
                    ).toString();

                    state.cards.inactive_category = (
                        Number(state.cards.inactive_category) + 1
                    ).toString();

                }

            })
            .addCase(category_card.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload as string;

            });

    },

});

export default categoryCardSlice.reducer;