import {combineReducers,configureStore} from '@reduxjs/toolkit'
import { MetaDataSlice } from '../reducers/MetaDataReducer'
import { stateSlice } from '../reducers/stateReducer'
import {QuestionSlice} from '../reducers/QuestionsReducer'
export const rootReducer = combineReducers({
    stateReducer : stateSlice.reducer,
    metaDataReducer : MetaDataSlice.reducer,
    questions : QuestionSlice.reducer,
})

export const store = configureStore({
    reducer : rootReducer
})