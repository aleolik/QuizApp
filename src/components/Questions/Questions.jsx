import css from './Questions.module.css'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import { LoadQuestions } from '../../redux-toolkit/asyncСreators/LoadQuestions'
import LoaderForQuestions from '../LoaderForQuestions/LoaderForQuestions'
export const shuffleArray = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
const Questions =  () => {
    const dispatch = useDispatch()
    const {chosenLevels,chosenCategories,inGame,currentPage} = useSelector(state => state.stateReducer)
    const {Questions,loadQuestions,QuestionsError} = useSelector(state => state.questions)

    useEffect(() => {
        if (!chosenCategories.length && !chosenLevels.length) return;
        dispatch(LoadQuestions())
    },[inGame])

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
                        <div className={css.selectQuestionContainer}>
                                {Questions?.map((question,i) => {
                                    return(
                                        <button style={{'maxWidth':70/Questions.length+'vw'}} className={css.selectQuestion}>{i+1}</button>
                                    )
                                })}
                            {/* {Questions?.slice(currentPage*5,currentPage*5+3).map((questionObject,i) => {
                                const category = questionObject?.category
                                const correctAnswer = questionObject?.correctAnswer
                                const difficulty = questionObject?.difficulty
                                const id = questionObject?.id
                                const incorrectAnswers = questionObject?.incorrectAnswers // array of 3 elems
                                const question = questionObject?.question
                                const type = questionObject?.typ
                                let AllAnswers = [];
                                if (Array.isArray(incorrectAnswers)){
                                    AllAnswers = [...incorrectAnswers,correctAnswer]
                                    AllAnswers = shuffleArray(AllAnswers)
                                }
                                return(
                                    <div key={id} className='mint'>
                                        <div className={css.containerOfQuestions}>
                                            {question}
                                            {AllAnswers.map((answer) => {
                                                return(
                                                    <button class={css.buttonAnswer} role="button"><span class="text" key={answer}>{answer}</span></button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })} */}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Questions