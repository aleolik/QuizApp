import css from './Questions.module.scss'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import { LoadQuestions } from '../../redux-toolkit/asyncСreators/LoadQuestions'
import LoaderForQuestions from '../LoaderForQuestions/LoaderForQuestions'
import { stateSlice } from '../../redux-toolkit/reducers/stateReducer'
import {Timer} from '../Timer/Timer'
// TODO answer the question bug
const Questions =  () => {
    const dispatch = useDispatch()
    const {chosenLevels,chosenCategories,inGame,COMPLETED_QUESTONS,currentQuestion} = useSelector(state => state.stateReducer)
    const {Questions,loadQuestions,QuestionsError} = useSelector(state => state.questions)
    const {CHANGE_CURRENT_QUESTION,ADD_ANSWER_TO_QUESTION} = stateSlice.actions
    useEffect(() => {
        if (!chosenCategories.length && !chosenLevels.length) return;
        dispatch(LoadQuestions())
    },[inGame])

    const ANSWER_ON_CLICK = (newElem) => {
        dispatch(ADD_ANSWER_TO_QUESTION({newElem}))
    }
    return(
        <div style={{'display':'flex','alignItems':'center','height':'inherit','width':'inherit','flexDirection':'column'}}>
            {loadQuestions && !QuestionsError
            ? (
                <LoaderForQuestions/>
            )
            : (
                <>
                    {QuestionsError
                    ? (
                        <div className={css.error}>{QuestionsError}</div>
                    )
                    : (
                        <div className={css.container}>
                                <Timer/>
                                <div className={css.containerOfSelectors}>
                                    {Questions?.map((question,i) => {
                                        let answeredQuestion = false
                                        if (Array.isArray(COMPLETED_QUESTONS) && COMPLETED_QUESTONS.length){
                                            COMPLETED_QUESTONS.forEach((elem) => {
                                                const index = elem?.index
                                                if (index === i){
                                                    answeredQuestion = true
                                                }
                                            })
                                        }
                                        return(
                                             <button key={i} onClick={() => dispatch(CHANGE_CURRENT_QUESTION(i))} style={{'width':90*2/Questions.length+'vw'}}  className={i === currentQuestion ? [css.activeBtn,css.glowButton].join(' ') : answeredQuestion ? [css.glowButton,css.completedQuestion].join(' ') :css.glowButton} type="button">{i+1}</button>                    
                                        )
                                    })}
                                </div>
                                <div className={css.containerOfQuestion}>
                                    {Questions?.map((questionObject,indexOfQuestion) => {
                                        if (indexOfQuestion !== currentQuestion) return;
                                        const category = questionObject?.category
                                        const correctAnswer = questionObject?.correctAnswer
                                        const difficulty = questionObject?.difficulty
                                        const id = questionObject?.id
                                        const incorrectAnswers = questionObject?.incorrectAnswers // array of 3 elems
                                        const question = questionObject?.question
                                        const AllAnswers = questionObject?.AllAnswers
                                        return(
                                            <div key={id} className='mint'>
                                                <div style={{'display':'flex','flexDirection':'column','paddingTop':2+'vh'}}>
                                                    <div className={css.textMaxSymbols}>{category} - {difficulty}</div>
                                                    <div></div>
                                                    <div className={css.textMaxSymbols}>{question}</div>
                                                    {AllAnswers.map((answer) => {
                                                    let glowAnsweredButton = false
                                                    COMPLETED_QUESTONS.forEach((elem) => {
                                                        const tempAnswer = elem?.answer
                                                        const index = elem?.index
                                                        if (answer === tempAnswer && indexOfQuestion === index){
                                                            glowAnsweredButton = true
                                                        }
                                                    })
                                                        return(
                                                            <button key={answer} onClick={() => ANSWER_ON_CLICK({index:indexOfQuestion,answer:answer})}  className={glowAnsweredButton ? [css.buttonAnswerActive,css.buttonAnswer].join(' ') : css.buttonAnswer} role="button"><span>{answer}</span></button>
                                                        )
                                                    })}
                                                </div>
                                                <button className={css.endBtn}>Finish Test</button>
                                            </div>
                                        )
                                    })}
                                </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Questions