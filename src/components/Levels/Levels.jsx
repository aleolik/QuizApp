import React,{useEffect} from 'react'
import './Levels.css'
import { useDispatch,useSelector } from 'react-redux'
import { useState } from 'react'
import { stateSlice } from '../../redux-toolkit/reducers/stateReducer'
import Loader from '../Loader/Loader'
import {AiOutlineClose} from 'react-icons/ai'
const Levels = () => {
  const dispatch = useDispatch()
  const [errorMessage,setErrorMessage] = useState('')
  const [levels,setLevels] = useState({})
  const chosenLevels = useSelector(state => state.stateReducer.chosenLevels)
  const {metaData,metaDataLoading,metaDataError} = useSelector(state => state.metaDataReducer)
  const {SET_LEVEL,REMOVE_LEVEL,ADD_LEVEL} = stateSlice.actions
    useEffect(() => {
      if (!metaData) return;
      const byDifficulty = metaData?.byDifficulty
      if (!byDifficulty) return;
      setLevels(byDifficulty)
      let tempArray = []
      Object.entries(byDifficulty).map(([name,value]) => {
        if (name === 'null') return;
        if (tempArray.includes(name)) return;
        tempArray.unshift(name)
      })
      dispatch(SET_LEVEL(tempArray))
  },[metaData])

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
       {metaDataLoading && !metaDataError
       ? (
        <Loader/>
       )
       : (
          <>
            {metaDataError
            ? (
              <div className='metaDataError'>{metaDataError}</div>
            )
            : (
              <>
                {typeof levels === 'object' && Object.keys(levels).length
                ? (
                  <div>
                      <h4>Active levels :  {`{${chosenLevels.length}}`},click on button to activate/deactivate</h4>
                      {Object.entries(levels).map(([level,value]) => {
                        // for some reason in DB,there is a null key,don't for what it stands for
                        if (level === 'null') return;
                        return(
                          <button key={level} onClick={() => REMOVE_OR_ADD_LEVEL(level)} className={`${chosenLevels.includes(level) ? 'level-button active' : 'level-button'}`}>{level}</button>
                        ) 
                      })}
                  </div>
                )
                : (
                  <div className='metaDataError'>Something went wrong...</div>
                )}
              </>
            )
            }
          </>
       )}
    </div>
  )
}

export default Levels