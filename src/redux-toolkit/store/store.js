import {combineReducers,configureStore} from '@reduxjs/toolkit'
import { MetaDataSlice } from '../reducers/MetaDataReducer'
import { stateSlice } from '../reducers/stateReducer'
import {QuestionSlice} from '../reducers/QuestionsReducer'
import { modalSlice } from '../reducers/ModalReducer'
import { settingSlice } from '../reducers/SettingsModal'
export const rootReducer = combineReducers({
    stateReducer : stateSlice.reducer,
    metaDataReducer : MetaDataSlice.reducer,
    questions : QuestionSlice.reducer,
    modal : modalSlice.reducer,
    setting : settingSlice.reducer,
})

export const store = configureStore({
    reducer : rootReducer
})