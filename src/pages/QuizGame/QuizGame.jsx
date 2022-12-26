import React from 'react'
import { useSelector } from 'react-redux'
import Quiz from '../../components/Quiz/Quiz'
const QuizGame = () => {
  const {inGame} = useSelector(state.stateReducer)
  const showModal = useSelector(state => state.modal.showModal)
  return (
    <div>
        {inGame && !showModal
        ? (
            <Quiz/>
        )
        : (
            <div>
                {/* 
                    modal that shows,number of correct answers
                */}
            </div>
        )}
    </div>
  )
}

export default QuizGame