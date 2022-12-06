import React from 'react'
import { useSelector } from 'react-redux'
import { stateSlice } from '../../redux-toolkit/reducers/stateReducer'


export const PossibleNumOfQuestions = [
    20,
    40,
    60,
]
const NumberOfQuestions = () => {

  const chosenNumOfQuestins = useSelector(state => state.stateReducer.chosenNumOfQuestins) 

  const SET_NEW_NUM_OF_QUESTIONS = stateSlice.actions.SET_NEW_NUM_OF_QUESTIONS


  return (
    <div>
        {PossibleNumOfQuestions.map((possibleNum) => {
            return(
                <button>{possibleNum}</button>
            )
        })}
    </div>
  )
}

export default NumberOfQuestions