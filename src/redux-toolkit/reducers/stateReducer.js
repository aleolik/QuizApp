import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    chosenCategories : [],
    chosenLevels : [],
    InGame : false,
    currentPage : 0, // var for questions display
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
        SET_CATEGORY(state,action){
            state.chosenCategories = action.payload
        },
        ADD_LEVEL(state,action){
            state.chosenLevels = [...state.chosenLevels,action.payload]
        },
        REMOVE_LEVEL(state,action){
            state.chosenLevels = state.chosenLevels.filter((level) => level !== action.payload)
        },
        SET_LEVEL(state,action){
            state.chosenLevels = action.payload
        },
        START_GAME(state){
            state.InGame = true
        }
    }
})