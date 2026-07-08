import { createSlice } from "@reduxjs/toolkit";
import { category_card } from "./category_card_thunk";
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

            .addCase(category_card.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload as string;

            });

    },

});

export default categoryCardSlice.reducer;