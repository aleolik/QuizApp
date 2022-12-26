import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    Questions : [],
    loadQuestions : false,
    QuestionsError : '',
    COMPLETED_QUESTONS : [],
    // answer is an object with fields id and answer,sorted in 2 different arrays below
    CORRECT_ANSWERS : [], 
    UNCORRECT_ANSWERS : [],
    currentQuestion : '', // for displaying current question - id
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
        CHANGE_CURRENT_QUESTION(state,action){
            // takes id of the question
            state.currentQuestion = action.payload
        },
        ADD_ANSWER_TO_QUESTION(state,action){
            const payload = action.payload
            const newElem = payload?.newElem
            const currentID = newElem?.id
            for (let i = 0;i<state.COMPLETED_QUESTONS.length;i++){
                 const elem = state.COMPLETED_QUESTONS[i]
                 const id = elem?.id
                 if (id === currentID){
                     state.COMPLETED_QUESTONS[i].answer = newElem?.answer
                     return;
                 }
            }
             state.COMPLETED_QUESTONS = [...state.COMPLETED_QUESTONS,newElem]
         },
         SET_USER_ANSWERS(state,action){
            state.CORRECT_ANSWERS = action.payload.CORRECT_ANSWERS
            state.UNCORRECT_ANSWERS = action.payload.UNCORRECT_ANSWERS
         },
    }
})