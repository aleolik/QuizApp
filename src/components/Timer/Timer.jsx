import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
export const Timer = () => {

  const startTime = useSelector(state => state.stateReducer.chosenTime) 

  const [time,setTime] = useState(startTime*60)

  useEffect(() => {
    setInterval(() => {
      setTime((prev) => (prev-1))
    },1000)
  },[])

  const mins = Math.floor(time/60)
  const seconds = Math.floor(time%60)
  const hours = Math.floor(time/60/60)

  // TODO : when time is <= 0,then end the game
  return (
    <div style={{'textAlign':'center'}}>
         {hours}:{mins}:{seconds}
    </div>
  )
}