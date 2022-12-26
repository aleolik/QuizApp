import { createSlice } from "@reduxjs/toolkit";
import { Settings } from "../../pages/MainMenu/MainMenu";


export const initialState = {
    currentSetting : Settings[0]

}

export const settingSlice = createSlice({
    name : 'modal',
    initialState : initialState,
    reducers : {
        SET_NEW_CURRENT(state,action){
            state.currentSetting = action.payload
        },
    }
})