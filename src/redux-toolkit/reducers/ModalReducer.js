import { createSlice } from "@reduxjs/toolkit";


export const initialState = {
    showModal:false, // boolean
    currentSetting : 'Categories',

}

export const modalSlice = createSlice({
    name : 'modal',
    initialState : initialState,
    reducers : {
        ENABLE_MODAL_WINDOW(state){
            state.showModal = true
        },
        DISABLE_MODAL_WINDOW(state){
            state.showModal = false
        }
    }
})