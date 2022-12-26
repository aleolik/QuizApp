import React from 'react'
import { settingSlice } from '../../redux-toolkit/reducers/SettingsModal'
import { Settings } from '../../pages/MainMenu/MainMenu'
import css from './SideBar.module.scss'
import { useDispatch,useSelector } from 'react-redux'
const SideBar = () => {
  const currentSetting = useSelector(state => state.setting.currentSetting)
  const dispatch = useDispatch()
  const SET_NEW_CURRENT = settingSlice.actions.SET_NEW_CURRENT
  const dispatchCurrentSetting = (newSetting) => {
    dispatch(SET_NEW_CURRENT(newSetting))
  }
  return (
    <div className={css.sideBar}>
        {Settings.map((setting) => {
          return(
            <button key={setting}  onClick={() => dispatchCurrentSetting(setting)} style={{'width':80/Settings.length+'vw','marginLeft':1+'vw'}}  className={currentSetting === setting ? ['glowButton','activeBtn'].join(' ') : 'glowButton'}>{setting}</button>
          )
        })}
    </div>
  )
}

export default SideBar