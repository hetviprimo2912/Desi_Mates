import { createSlice } from "@reduxjs/toolkit";
import { edit_category } from "./edit_category_thunk";
import type {
    EditCategoryState,
} from "../../../Types/CategoryTypes/edit_category_types";

const initialState: EditCategoryState = {

    loading:false,

    error:null,

    category:null,

};

const editCategorySlice=createSlice({

    name:"edit_category",

    initialState,

    reducers:{},

    extraReducers:(builder)=>{

        builder

        .addCase(edit_category.pending,(state)=>{

            state.loading=true;

            state.error=null;

        })

        .addCase(edit_category.fulfilled,(state,action)=>{

            state.loading=false;

            state.category=action.payload.category;

        })

        .addCase(edit_category.rejected,(state,action)=>{

            state.loading=false;

            state.error=action.payload as string;

        });

    }

});

export default editCategorySlice.reducer;