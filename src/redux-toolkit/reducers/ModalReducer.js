import { createSlice } from "@reduxjs/toolkit";


export const PossibleSettings = [
    'Categories',
    'Levels',
    'NumberOfQuestions',
    'Time',
]
export const initialState = {
    showModal:false,   // boolean
    /*  
        currentSetting can be :
        any variant in PossibleSettings
    */
    currentSetting : 'Categories'

}

export const modalSlice = createSlice({
    name : 'modal',
    initialState : initialState,
    reducers : {
        CHANGE_MODAL_STATE(state){
            state.showModal = !state.showModal
        },
        SET_NEW_CURRENT_SETTING(state,action){
            if (!PossibleSettings.includes(action.payload)) return;
            state.currentSetting = action.payload
        }
    }
})