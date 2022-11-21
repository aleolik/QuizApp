import React, { useEffect, useState } from "react"
import { useGetData } from "../../hooks/useGetData"
import Loader from "../Loader/Loader"
import './Genres.css'
import {useSelector,useDispatch} from 'react-redux'
import { stateSlice } from "../../redux-toolkit/reducers/stateReducer"
export const Genres = () => {
      //metaData
      const metadataURL  = 'https://the-trivia-api.com/api/metadata'
      const [metaData,metaDataLoading,metaDataError] = useGetData(metadataURL)
      const [categories,setCategories] = useState({})
      const [levels,setLevels] = useState({})
      // redux vars + actions
      const dispatch = useDispatch()
      const {chosenLevels,chosenCategories} = useSelector(state => state.stateReducer)
      const {ADD_CATEGORY,REMOVE_CATEGORY,SET_CATEGORIES} = stateSlice.actions
      useEffect(() => {
            if (!metaData) return;
            const byCategory = metaData?.byCategory
            const byDifficulty =  metaData?.byDifficulty
            if (!byCategory || !byDifficulty) return;
            setCategories(byCategory)
            setLevels(byDifficulty)
            Object.entries(byCategory).map(([name,value]) => {
              if (chosenCategories.includes(name)) return;
              dispatch(ADD_CATEGORY(name))
            })
      },[metaData])

      const ADD_OR_REMOVE_CATEGORY = (name) => {
        if (chosenCategories.includes(name)){
          dispatch(REMOVE_CATEGORY(name))
        }
        else{
          dispatch(ADD_CATEGORY(name))
        }
      }
    return(
        <div className='genres'>
          {metaDataLoading && !metaDataError
          ? (
            <Loader/>
          )
          : (
            <div>
                {metaDataError
                ? (
                  <div className="metaDataError">{metaDataError}</div>
                )
                : (
                  <>
                    {typeof categories === 'object' && Object.keys(categories).length
                    ? (
                      <div>
                           <h6>Active categoreis : {!chosenCategories.length ? Object.keys(categories).length : chosenCategories.length},click on button to activate/deactivate</h6>
                           {Object.entries(categories).map(([name,value]) => {
                              return(
                                  <button onClick={() => ADD_OR_REMOVE_CATEGORY(name)} className={`${chosenCategories.includes(name) ? 'category-btn active' : 'category-btn'}`} key={name}>{name} : {value}</button>
                              )
                        })}
                      </div>
                    )
                    : (
                      <div className="metaDataError">Something went wrong...</div>
                    )}
                  </>
                )}
          </div>
        )}
  </div>
    )
}