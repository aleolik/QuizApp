import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stateSlice } from '../../redux-toolkit/reducers/stateReducer'
import css from './NumberOfQuestions.module.scss'

// TODO : better styles
export const PossibleNumOfQuestions = [
   // limit 50 in 1 api call
    10,15,20,25,30,35,40,45,50
]
const NumberOfQuestions = () => {

  const chosenNumOfQuestins = useSelector(state => state.stateReducer.chosenNumOfQuestins) 

  const SET_NEW_NUM_OF_QUESTIONS = stateSlice.actions.SET_NEW_NUM_OF_QUESTIONS

  const dispatch = useDispatch()

  const DISPATCH_SET_NUM_OF_QUESTIONS = (num) => {
    if (num === chosenNumOfQuestins) return;
    dispatch(SET_NEW_NUM_OF_QUESTIONS(num))
  }
  return (
    <div className={css.container}>
         <h4>Number of Questions :  {`{${chosenNumOfQuestins}}`},click on button to activate/deactivate</h4>
         <div style={{'flexDirection':'row'}}>
            {PossibleNumOfQuestions.map((possibleNum) => {
                return(
                    <button style={{'height':20*Math.ceil(PossibleNumOfQuestions.length/3)}} key={possibleNum} onClick={() => DISPATCH_SET_NUM_OF_QUESTIONS(possibleNum)} className={`${chosenNumOfQuestins === possibleNum ? `${[css.btn_selector,css.active].join(' ')}` : `${css.btn_selector}`}`}>{possibleNum}</button>
                )
            })}
         </div>
    </div>
  )
}

export default NumberOfQuestions