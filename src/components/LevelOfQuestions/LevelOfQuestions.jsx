import React from 'react'
import './LevelOfQuestions.css'


const LevelOfQuestions = ({levels}) => {
  return (
    <div>
        {Object.keys(levels).length && Object.entries(levels).map(([level,value]) => {
          return(
            <button key={level}>{level}:{value}</button>
          )
        })}
    </div>
  )
}

export default LevelOfQuestions