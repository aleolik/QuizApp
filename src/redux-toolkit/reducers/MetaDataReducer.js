import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    metaData : [],
    metaDataError : '',
    metaDataLoading : false
}

export const MetaDataSlice = createSlice({
    name : 'META_DATA',
    initialState : initialState,
    reducers : {
       LOAD_META_DATA(state){
            state.metaData = []
            state.metaDataError = ''
            state.metaDataLoading = true
       },
       LOAD_META_DATA_SUCCESS(state,action){
        state.metaData = action.payload
        state.metaDataError = ''
        state.metaDataLoading = false
       },
        LOAD_META_DATA_ERROR(state,action){
            state.metaData = []
            state.metaDataError = action.payload
            state.metaDataLoading = false
       },
    }
})