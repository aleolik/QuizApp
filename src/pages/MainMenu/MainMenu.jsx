// renders MainMenu

import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../components/Modal/Modal'
import Categories from '../../components/Categories/Categories'
import Levels from '../../components/Levels/Levels'
import Time from '../../components/Time/Time'
import NumberOfQuestions from '../../components/NumberOfQuestions/NumberOfQuestions'
import { LoadMetaData } from '../../redux-toolkit/asyncСreators/LoadMetaData'
import { modalSlice } from '../../redux-toolkit/reducers/ModalReducer'
import useDispatchCategoires from '../../hooks/useDispatchCategories'
import useDispatchLevels from '../../hooks/useDispatchLevels'
import DownArrrow from '../../components/DownArrow/DownArrrow'
import PlayButton from '../../components/PlayButton/PlayButton'
import {AiFillSetting} from 'react-icons/ai'
export const Settings = [
    'Categories',
    'Levels',
    'Time',
    'Amount',
]

const MainMenu = () => {
    const showModal  = useSelector(state => state.modal.showModal)
    const currentSetting = useSelector(state => state.setting.currentSetting)
    const dispatch = useDispatch()
    const ENABLE_MODAL_WINDOW = modalSlice.actions.ENABLE_MODAL_WINDOW
    const {metaDataError,metaDataLoading} = useSelector(state => state.metaDataReducer)
    useEffect(() => {
      // load MetaData
        dispatch(LoadMetaData())
    },[])
    // dispatch categories
    const AllCategories = useDispatchCategoires()
    // dispatch levels
    const AllLevels = useDispatchLevels()
    // handlers
    const SettingsOnClick = () => {
        if (metaDataLoading || metaDataError) return;
        dispatch(ENABLE_MODAL_WINDOW())
    }

    return (
        <div>
            {metaDataError && !metaDataLoading
            ? (
                <>
                    {metaDataError}
                </>
            )
            : (
                <>  
                    <div>
                        <h3 className='text_shadow'>settings</h3>
                        <DownArrrow/>
                        <div className='centerdDiv'><AiFillSetting  onClick={SettingsOnClick} size={60} className='settingsBtn'></AiFillSetting></div>
                        <PlayButton/>
                    </div>
                    {showModal && (
                        <Modal>
                            {currentSetting === Settings[0] && (
                                <Categories AllCategories={AllCategories}/>
                            )}
                            {currentSetting === Settings[1] && (
                                <Levels AllLevels={AllLevels}/>
                            )}
                            {currentSetting === Settings[2] && (
                                <Time/>
                            )}
                            {currentSetting === Settings[3] && (
                                <NumberOfQuestions/>
                            )}
                        </Modal>
                    )}
                </>
            )}
        </div>
    )
}

export default MainMenu