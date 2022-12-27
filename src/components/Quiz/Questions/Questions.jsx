import React from 'react'
import css from './Questions.module.scss'
import { stateSlice } from '../../../redux-toolkit/reducers/stateReducer'
import { useDispatch,useSelector} from 'react-redux'
import { QuestionSlice } from '../../../redux-toolkit/reducers/QuestionsReducer'
import {isMobile} from 'react-device-detect'
// changes in JSX - disabled
const QuestionsComponent = ({testFinished}) => {
  const ADD_ANSWER_TO_QUESTION = QuestionSlice.actions.ADD_ANSWER_TO_QUESTION
  const dispatch = useDispatch()
  const {COMPLETED_QUESTONS,currentQuestion} = useSelector(state => state.questions)
  const {Questions} = useSelector(state => state.questions)
  const ANSWER_ON_CLICK = (newElem) => {
        if (testFinished) return;
        dispatch(ADD_ANSWER_TO_QUESTION({newElem}))
  }
  return (
    <div >
        {Questions?.map((questionObject) => {
            if (questionObject?.id !== currentQuestion) return;
            const category = questionObject?.category
            const correctAnswer = questionObject?.correctAnswer
            const difficulty = questionObject?.difficulty
            const id = questionObject?.id
            const incorrectAnswers = questionObject?.incorrectAnswers // array of 3 elems
            const question = questionObject?.question
            const AllAnswers = questionObject?.AllAnswers
            
            return(
                <div key={id}>
                    <div style={{'display':'flex','flexDirection':'column'}}/>
                        <div>{category} - {difficulty}</div>
                        <div className={css.textMaxSymbols}>{question}</div>
                        <div/>
                        {AllAnswers.map((answer) => {
                            let ADDITIONAL_CLASSNAME = testFinished ? 'darkRedBtn' : css.buttonAnswerDefault
                            let glowAnsweredButton = false
                            COMPLETED_QUESTONS.forEach((elem) => {
                                    const elemAnswer = elem?.answer
                                    const elemID = elem?.id
                                    if (answer === elemAnswer && elemID === id){
                                        glowAnsweredButton = true
                                     }
                                     if(testFinished && correctAnswer === answer){
                                        ADDITIONAL_CLASSNAME = 'greenBtn'
                                    }
                            })
                            return(
                                <div style={{'display':'flex'}}>
                                    <button  style={{'transform':`${glowAnsweredButton ? 'scale(1.1) ': ''}`}} key={answer} onClick={() => ANSWER_ON_CLICK({id:id,answer:answer})}  className={glowAnsweredButton && !testFinished ? [css.buttonAnswerActive,css.buttonAnswer].join(' ') : [css.buttonAnswer,ADDITIONAL_CLASSNAME].join(' ')} role="button">
                                        <span>
                                            {answer}
                                            <div style={{'fontSize':20,'color':'black'}}>{glowAnsweredButton && testFinished ? ' - Your Answer' : ''}</div>
                                        </span>
                                    </button>
                                </div>
                            )
                        })}
                </div>
                )
            })}
        </div>
  )
}

export default QuestionsComponent