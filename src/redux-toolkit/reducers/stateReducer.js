import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    chosenCategories : [],
    chosenLevels : []
}

export const stateSlice = createSlice({
    name : 'state',
    initialState : initialState,
    reducers : {
        ADD_CATEGORY(state,action){
            state.chosenCategories = [...state.chosenCategories,action.payload]
        },
        REMOVE_CATEGORY(state,action){
            state.chosenCategories = state.chosenCategories.filter((category) => category !== action.payload)
        },
    }
})