import './Categories.css'
import React, { useState ,useEffect} from 'react'
import Loader from '../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { stateSlice } from '../../redux-toolkit/reducers/stateReducer'

const Categories = () => {
    const dispatch = useDispatch()
    const chosenCategories = useSelector(state => state.stateReducer.chosenCategories)
    const {metaData,metaDataLoading,metaDataError} = useSelector(state => state.metaDataReducer)
    const [categories,setCategories] = useState({})
    const {ADD_CATEGORY,REMOVE_CATEGORY} = stateSlice.actions
    const ADD_OR_REMOVE_CATEGORY = (name) => {
        if (chosenCategories.includes(name)){
          dispatch(REMOVE_CATEGORY(name))
        }
        else{
          dispatch(ADD_CATEGORY(name))
        }
      }
    useEffect(() => {
        if (!metaData) return;
        const byCategory = metaData?.byCategory
        if (!byCategory) return;
        setCategories(byCategory)
        Object.entries(byCategory).map(([name,value]) => {
          if (chosenCategories.includes(name)) return;
          dispatch(ADD_CATEGORY(name))
        })
    },[metaData])
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

export default Categories