import {combineReducers,configureStore} from '@reduxjs/toolkit'
import { stateSlice } from '../reducers/stateReducer'
export const rootReducer = combineReducers({
    stateReducer : stateSlice.reducer
})

export const store = configureStore({
    reducer : rootReducer
})