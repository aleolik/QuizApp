import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useFinishTest } from '../../hooks/useFinishTest'
import {stateSlice} from '../../redux-toolkit/reducers/stateReducer'
import { RenderTimeFormat } from '../../utils/RenderTimeFormat'
export const Timer = ({interValID,SetInterValID,time,setTime,testFinished}) => {

  const {Questions} = useSelector(state => state.questions)
  const dispatch = useDispatch()
  const finishTest = useFinishTest(Questions)

  useEffect(() => {
    if (testFinished) return;
    const tick = () => {
      setTime((prev) => (prev-1))
    }
    if (!interValID){
      SetInterValID(setInterval(tick,1000))
    }
  },[])
  useEffect(() => {
    if (time === 0){
      SetInterValID(clearInterval(interValID))
      finishTest()
    }
  },[time])

  return (
   <RenderTimeFormat timeInSeconds={time}/>
  )
}