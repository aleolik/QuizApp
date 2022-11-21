import {combineReducers,configureStore} from '@reduxjs/toolkit'
import { MetaDataSlice } from '../reducers/MetaDataReducer'
import { stateSlice } from '../reducers/stateReducer'
export const rootReducer = combineReducers({
    stateReducer : stateSlice.reducer,
    metaDataReducer : MetaDataSlice.reducer,
})

export const store = configureStore({
    reducer : rootReducer
})