import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stateSlice } from '../../redux-toolkit/reducers/stateReducer'
import SideBar from '../SideBar/SideBar'
import css from './NumberOfQuestions.module.scss'
import { isMobile } from 'react-device-detect'
export const PossibleNumOfQuestions = [
   // limit 50 in 1 api call
    10,12,14,16,20,22,24,32
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
    <div>
        <SideBar/>
        <div className={css.container}>
         <h4>Number of Questions :  {`{${chosenNumOfQuestins}}`},click on button to activate/deactivate</h4>
            <div style={{'flexDirection':'row'}}>
                {PossibleNumOfQuestions.map((possibleNum) => {
                    return(
                        <button style={{'width':isMobile ? 30+'vw':35+'vw'}} key={possibleNum} onClick={() => DISPATCH_SET_NUM_OF_QUESTIONS(possibleNum)} className={chosenNumOfQuestins === possibleNum ? ['glowButton','activeBtn'].join(' ') : 'glowButton'}>{possibleNum}</button>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default NumberOfQuestions