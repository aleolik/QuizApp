import React,{useEffect} from 'react'
import './Levels.css'
import { useDispatch,useSelector } from 'react-redux'
import { useState } from 'react'
import { stateSlice } from '../../redux-toolkit/reducers/stateReducer'
import Loader from '../Loader/Loader'
import {AiOutlineClose} from 'react-icons/ai'
import SideBar from '../SideBar/SideBar'
// TODO : delete useless code,levels is an array now not an object,so fix it
const Levels = ({AllLevels}) => {
  const dispatch = useDispatch()
  const [errorMessage,setErrorMessage] = useState('')
  const chosenLevels = useSelector(state => state.stateReducer.chosenLevels) // to display chosen levels
  const {REMOVE_LEVEL,ADD_LEVEL} = stateSlice.actions

  // handlers
  const REMOVE_OR_ADD_LEVEL = (level) => {
    if (chosenLevels.length === 1 && chosenLevels.includes(level)){
      setErrorMessage('You must select at least 1 difficulty')
      return;
    }
    setErrorMessage('')
    if (chosenLevels.includes(level)){
      dispatch(REMOVE_LEVEL(level))
      return;
    }
    dispatch(ADD_LEVEL(level))
  }
  return (
    <div className='levels'>
        {errorMessage && (
          <div className='selectError'>{errorMessage}<AiOutlineClose onClick={() => setErrorMessage('')} className='close-btn' size={25}/></div>
        )}
          <>
                  <div>
                      <h4>Active levels :  {`{${chosenLevels.length}}`},click on button to activate/deactivate</h4>
                      {AllLevels.map((level) => {
                        return(
                          <button key={level} onClick={() => REMOVE_OR_ADD_LEVEL(level)} className={`${chosenLevels.includes(level) ? 'level-button active' : 'level-button'}`}>{level}</button>
                        ) 
                      })}
                  </div>
            </>
        </div>
  )
}

export default Levels