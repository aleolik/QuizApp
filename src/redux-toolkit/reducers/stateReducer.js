import { createSlice } from "@reduxjs/toolkit";
import { PossibleNumOfQuestions } from "../../components/NumberOfQuestions/NumberOfQuestions";
import { possibleChosenTime } from "../../components/Time/Time";

export const initialState = {
    /* GAME SETTINGS
    */
    inGame : false, // for displaying questions
    chosenCategories : [],
    chosenLevels : [],
    chosenTime : possibleChosenTime[0], // float or int
    chosenNumOfQuestins : PossibleNumOfQuestions.length % 2 === 0 ? PossibleNumOfQuestions[PossibleNumOfQuestions.length/2] : PossibleNumOfQuestions[Math.floor(PossibleNumOfQuestions.length/2)],
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
        SET_CATEGORIES(state,action){
            state.chosenCategories = action.payload
        },
        ADD_LEVEL(state,action){
            state.chosenLevels = [...state.chosenLevels,action.payload]
        },
        REMOVE_LEVEL(state,action){
            state.chosenLevels = state.chosenLevels.filter((level) => level !== action.payload)
        },
        SET_LEVELS(state,action){
            const payload = action.payload
            state.chosenLevels = action.payload
        },
        START_GAME(state){
            state.inGame = true
        },
        SET_NEW_TIME(state,action){
            state.chosenTime = action.payload
        },
        SET_NEW_NUM_OF_QUESTIONS(state,action){
            state.chosenNumOfQuestins = action.payload
        },
    }
})