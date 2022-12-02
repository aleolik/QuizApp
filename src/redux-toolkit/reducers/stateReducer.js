import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    /* GAME SETTINGS
    */
    InGame : false, // for displaying uestions
    chosenCategories : [],
    chosenLevels : [],
    currentQuestion : 0, // for displaying current question
    COMPLETED_QUESTONS : [] // [{key:v},{key1:v1},etc]

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
            state.InGame = true
        },
        CHANGE_CURRENT_QUESTION(state,action){
            state.currentQuestion = action.payload
        },
        ADD_ANSWER_TO_QUESTION(state,action){
           const payload = action.payload
           const newElem = payload?.newElem
           const currentIndex = newElem?.index
           console.log(payload)
           for (let i = 0;i<state.COMPLETED_QUESTONS.length;i++){
                const elem = state.COMPLETED_QUESTONS[i]
                const index = elem?.index
                console.log('index',index)
                if (index === currentIndex){
                    state.COMPLETED_QUESTONS[i] = newElem
                    return;
                }
           }
            state.COMPLETED_QUESTONS = [...state.COMPLETED_QUESTONS,newElem]
        },
    }
})