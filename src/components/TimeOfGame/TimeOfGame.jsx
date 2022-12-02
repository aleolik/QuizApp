import React, { useEffect, useState } from 'react'

export const TimeOfGame = () => {

  const startTime = Date.now()


  const [leftTime,setLeftTime] = useState(Date.now())

  useEffect(() => {
    setInterval(() => leftTime(Date.now() - startTime),1000)
  },[])

  const seconds = Math.floor(setLeftTime/60)
  const mins = Math.floor(setLeftTime/60/60)
  const hours = Math.floor(setLeftTime/60/60/60)


  return (
    <div>
         
    </div>
  )
}