import React from 'react'
import css from './Warning.module.scss'
import {Toaster,toast} from 'react-hot-toast'
import { useEffect } from 'react'
const Warning = ({showWarning,setShowWarning,givenText}) => {

  useEffect(() => {
    if (!showWarning) return;
    const text = givenText ? givenText : 'Something went wrong...'
    toast.error(text,{
        duration:3000
    })
    setShowWarning(false)
  },[showWarning])
  return (
    <div>
        <Toaster/>
    </div>
  )
}

export default Warning