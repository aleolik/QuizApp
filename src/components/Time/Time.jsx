import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stateSlice } from '../../redux-toolkit/reducers/stateReducer'
import css from './Time.module.scss'
const possibleChosenTime = [10,15,20,30,40,45]
const Time = () => {
  const dispatch = useDispatch()
  const SET_NEW_TIME = stateSlice.actions.SET_NEW_TIME
  const chosenTime = useSelector(state => state.stateReducer.chosenTime) 

  // handlers
  const DISPATCH_NEW_TIME = (newTime) => {
    if (newTime === chosenTime) return;
    dispatch(SET_NEW_TIME(newTime))
  }
  return (
    <div className={css.timeContainer}>
        {possibleChosenTime.map((timeVar) => {
            return(
                <button key={timeVar} style={{'width':100/possibleChosenTime.length+'vw'}} className={chosenTime === timeVar ? [css.timeButton,css.active].join(' '): css.timeButton} onClick={() => DISPATCH_NEW_TIME(timeVar)}>{timeVar}</button>
            )
        })}
    </div>
  )
}

export default Time