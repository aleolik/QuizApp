import React from 'react'
import css from './DownArrrow.module.scss'
const DownArrrow = () => {
  return (
    <div style={{'display':'flex','justifyContent':'center','marginBottom':8+'vh'}}>
        <div>
            <div className={css.arrow}></div>
        </div>
    </div>
  )
}

export default DownArrrow