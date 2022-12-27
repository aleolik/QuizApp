import React from "react"

export const RenderTimeFormat = ({timeInSeconds}) => {
  if (timeInSeconds === undefined || typeof timeInSeconds !== 'number') return <></>
  const mins = Math.floor(timeInSeconds/60)
  const seconds = Math.floor(timeInSeconds%60)
  const hours = Math.floor(timeInSeconds/60/60)

  return(
    <div style={{'textAlign':'center' }}>
        {hours ? hours >= 10 ? `${hours}:` : `0${hours}:` : ''}{mins >= 10 ? `${mins}` : `0${mins}`}:{seconds >= 10 ? `${seconds}` : `0${seconds}`}
    </div>
  )

}