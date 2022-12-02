import './Categories.css'
import React, { useState ,useEffect} from 'react'
import Loader from '../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { stateSlice } from '../../redux-toolkit/reducers/stateReducer'
import {AiOutlineClose} from 'react-icons/ai'
import SideBar from '../SideBar/SideBar'
const Categories = ({AllCategories}) => {
    const dispatch = useDispatch()
    const [selectError,setSelectedError] = useState('') // works,if chosenCategories.length === 1 and trying to delete the last category
    const chosenCategories = useSelector(state => state.stateReducer.chosenCategories)
    const {ADD_CATEGORY,REMOVE_CATEGORY} = stateSlice.actions

    // handlers
    const ADD_OR_REMOVE_CATEGORY = (name) => {
        if (chosenCategories.includes(name) && chosenCategories.length === 1){
            setSelectedError('You must choose at least 1 category')
            return;
        }
        if(selectError){
          setSelectedError('')
        }
        if (chosenCategories.includes(name)){
          dispatch(REMOVE_CATEGORY(name))
        }
        else{
          dispatch(ADD_CATEGORY(name))
        }
    }
    return(
    <div className='genres'>
            <div>
                {selectError && (
                  <div className="selectError">{selectError}<AiOutlineClose onClick={() => setSelectedError('')} className='close-btn' size={25}/></div>
                )}
                  <>
                      <div>
                           <h6>Active categoreis : {`{${chosenCategories.length}}`},click on button to activate/deactivate</h6>
                           {AllCategories.map((category) => {
                              return(
                                  <button onClick={() => ADD_OR_REMOVE_CATEGORY(category)} className={`${chosenCategories.includes(category) ? 'category-btn active' : 'category-btn'}`} key={category}>{category}</button>
                               )
                            })}
                      </div>
                  </>
          </div>
        </div>
    )
}

export default Categories