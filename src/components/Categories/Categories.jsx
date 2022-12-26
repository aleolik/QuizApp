
import React, { useState ,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stateSlice } from '../../redux-toolkit/reducers/stateReducer'
import {AiOutlineClose} from 'react-icons/ai'
import css from './Categories.module.scss'
import SideBar from '../SideBar/SideBar'
import {isMobile} from 'react-device-detect'
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
    <div>
        <SideBar/>
        <div className={css.categories}>
                {selectError && (
                  <div className={css.selectError}>{selectError}<AiOutlineClose onClick={() => setSelectedError('')} className={css.close_btn} size={25}/></div>
                )}
                  <>
                      <div>
                           <h6>Active categoreis : {`{${chosenCategories.length}}`},click on button to activate/deactivate</h6>
                           {AllCategories.map((category) => {
                              return(
                                  <button style={{'height':5+'vh','width':isMobile ? 40+'vw' : 30+'vw'}} onClick={() => ADD_OR_REMOVE_CATEGORY(category)} className={chosenCategories.includes(category) ? ['glowButton','activeBtn'].join(' ') : 'glowButton'} key={category}>{category}</button>
                               )
                            })}
                      </div>
                  </>
        </div>
    </div>
    )
}

export default Categories