import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    Questions : [],
    loadQuestions : false,
    QuestionsError : '',
}

export const QuestionSlice = createSlice({
    name : 'questions',
    initialState : initialState,
    reducers : {
        LoadQuestions(state){
            state.Questions = []
            state.QuestionsError = ''
            state.loadQuestions = true
        },
        LoadQuestionsSuccess(state,action){
            state.Questions = action.payload
            state.QuestionsError = ''
            state.loadQuestions = false
        },
        LoadQuestionsError(state,action){
            state.Questions = []
            state.QuestionsError = action.payload
            state.loadQuestions = false
        },
    }
})