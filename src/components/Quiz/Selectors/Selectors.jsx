
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { QuestionSlice } from '../../../redux-toolkit/reducers/QuestionsReducer'
import css from './Selectors.module.scss'
const SelectorsComponent =  ({testFinished}) => {
    const dispatch = useDispatch()
    const {COMPLETED_QUESTONS,currentQuestion,CORRECT_ANSWERS} = useSelector(state => state.questions)
    const Questions = useSelector(state => state.questions.Questions)
    const CHANGE_CURRENT_QUESTION = QuestionSlice.actions.CHANGE_CURRENT_QUESTION

    // TODO : hook useDevice to make different limits of viewports
    // TODO : better sylings
    return(
        <div>
            <div className={css.containerOfSelectors}>
            {Questions?.map((question,i) => {
                let colorClassName;
                const id = question.id
                if (Array.isArray(COMPLETED_QUESTONS) && COMPLETED_QUESTONS.length){
                    COMPLETED_QUESTONS.forEach((elem) => {
                        const elemID = elem?.id
                        const userAnswer = elem?.answer
                        if (id === elemID){
                                if (testFinished){
                                    CORRECT_ANSWERS.forEach((elem) => {
                                        const correctAnswerID = elem.id
                                        const correctAnswer = elem.correctAnswer
                                        if (correctAnswerID === id && userAnswer === correctAnswer){
                                            colorClassName = 'greenBtn'
                                        }
                                    })
                                    if (!colorClassName){
                                        colorClassName = 'darkRedBtn'
                                    }
                                }   
                                else{
                                    console.log('else block')
                                    colorClassName = 'purpleBtn'
                                }
                            }
                    })
                }
                return(
                    <button key={id} onClick={() => dispatch(CHANGE_CURRENT_QUESTION(id))} style={{'width':Questions.length % 2 === 0 ? 90/10+'vw' : 90/15+'vw'}}  className={id === currentQuestion && !testFinished ? ['glowButton','activeBtn'].join(' ') : ['glowButton',colorClassName,].join(' ')} type="button">{i+1}</button>                    
                )
              })}
            </div>                                    
        </div>
    )
}

export default SelectorsComponent