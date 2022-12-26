import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { stateSlice } from "../redux-toolkit/reducers/stateReducer";
import { QuestionSlice } from "../redux-toolkit/reducers/QuestionsReducer";
import { modalSlice } from "../redux-toolkit/reducers/ModalReducer";

/*
    call when :
        1)answered all questions and pressed finish button
        2)time for questions had ended
*/
export const useFinishTest = (allQuestions=[]) => {
    const {COMPLETED_QUESTONS} = useSelector(state => state.questions)
    const SET_USER_ANSWERS = QuestionSlice.actions.SET_USER_ANSWERS
    const ENABLE_MODAL_WINDOW = modalSlice.actions.ENABLE_MODAL_WINDOW
    const dispatch = useDispatch()
    if (!Array.isArray(allQuestions) || (Array.isArray(allQuestions) && !allQuestions.length)) return;


    const UNCORRECT_ANSWERS = []
    const CORRECT_ANSWERS = []

    const finishTest = (interValID,SetInterValID) => {
        for (let i = 0;i<allQuestions.length;i++){
            const firstQuestion = allQuestions[i]
            const firstID = firstQuestion.id
            const correctAnswer = firstQuestion.correctAnswer
            let notAnsweredOrUnccorect = true
            for (let j = 0;j<COMPLETED_QUESTONS.length;j++){
                const secondQuestion = COMPLETED_QUESTONS[j]
                const secondID = secondQuestion.id
                const userAnswer = secondQuestion?.answer
                if (secondID === firstID){ 
                    if (userAnswer === correctAnswer){
                        notAnsweredOrUnccorect = false
                        CORRECT_ANSWERS.push({
                            id : firstID,
                            correctAnswer : correctAnswer
                        })
                    }
                }
            }
            if (notAnsweredOrUnccorect){
                UNCORRECT_ANSWERS.push({
                    id : firstID,
                    correctAnswer : correctAnswer
                })
            }
        }
        // sets answers
        dispatch(SET_USER_ANSWERS({
            CORRECT_ANSWERS : CORRECT_ANSWERS,
            UNCORRECT_ANSWERS : UNCORRECT_ANSWERS
        }))
        // shows modal
        if (interValID !== undefined && typeof clearInterval === 'function'){
            SetInterValID(clearInterval(interValID))
        }
        dispatch(ENABLE_MODAL_WINDOW())
    }

    return(
        finishTest
    )
}
