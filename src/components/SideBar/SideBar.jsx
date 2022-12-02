import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalSlice, PossibleSettings } from '../../redux-toolkit/reducers/ModalReducer'
import css from './SideBar.module.scss'
const SideBar = () => {
  const currentSetting = useSelector(state => state.modal.currentSetting)
  const dispatch = useDispatch()
  const SET_NEW_CURRENT_SETTING = modalSlice.actions.SET_NEW_CURRENT_SETTING
  const dispatchCurrentSetting = (newSetting) => {
    dispatch(SET_NEW_CURRENT_SETTING(newSetting))
  }
  return (
    <div className={css.sideBar}>
        {PossibleSettings.map((setting) => {
          return(
            <button onClick={() => dispatchCurrentSetting(setting)} style={{'width':75/PossibleSettings.length+'vw'}}  className={currentSetting === setting ? [css.btnSetting,css.active].join(' ') : css.btnSetting}>{setting}</button>
          )
        })}
    </div>
  )
}

export default SideBar