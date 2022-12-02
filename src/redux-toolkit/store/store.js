import {combineReducers,configureStore} from '@reduxjs/toolkit'
import { MetaDataSlice } from '../reducers/MetaDataReducer'
import { stateSlice } from '../reducers/stateReducer'
import {QuestionSlice} from '../reducers/QuestionsReducer'
import { modalSlice } from '../reducers/ModalReducer'
export const rootReducer = combineReducers({
    stateReducer : stateSlice.reducer,
    metaDataReducer : MetaDataSlice.reducer,
    questions : QuestionSlice.reducer,
    modal : modalSlice.reducer
})

export const store = configureStore({
    reducer : rootReducer
})