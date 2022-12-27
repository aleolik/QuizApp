import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stateSlice } from '../../redux-toolkit/reducers/stateReducer'
import SideBar from '../SideBar/SideBar'
import css from './Time.module.scss'
import {isBrowser,isMobile,isTablet} from 'react-device-detect'
export const possibleChosenTime = [5,10,12,14,16,20,24,30]
const Time = () => {
  const dispatch = useDispatch()
  const SET_NEW_TIME = stateSlice.actions.SET_NEW_TIME

  const chosenTime = useSelector(state => state.stateReducer.chosenTime) 

  const DISPATCH_NEW_TIME = (newTime) => {
    if (newTime === chosenTime) return;
    dispatch(SET_NEW_TIME(newTime))
  }
  return (
    <div>
      <SideBar/>
      <div className={css.timeContainer}>
          {possibleChosenTime.map((timeVar) => {
              return(
                  <button style={{'width':isMobile ? 35+'vw' : 17.5+'vw'}} key={timeVar}  className={chosenTime === timeVar ? ['glowButton','activeBtn'].join(' '): 'glowButton'} onClick={() => DISPATCH_NEW_TIME(timeVar)}>{timeVar}</button>
              )
          })}
      </div>
    </div>
  )
}

export default Time