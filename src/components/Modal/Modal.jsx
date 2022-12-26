
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalSlice } from '../../redux-toolkit/reducers/ModalReducer'
import SideBar from '../SideBar/SideBar'
import css from './Modal.module.scss'
import {AiOutlineClose} from 'react-icons/ai'
const Modal  = ({children}) => {
  const DISABLE_MODAL_WINDOW = modalSlice.actions.DISABLE_MODAL_WINDOW
  const showModal = useSelector(state => state.modal.showModal)
  const dispatch = useDispatch()
  const rootClasses = [css.modal]
  if (showModal) rootClasses.push(css.active)

  // handlers
  const closeModalWindow = () => {
    dispatch(DISABLE_MODAL_WINDOW())
  }
  return (
      <div className={rootClasses.join(' ')} onClick={closeModalWindow}>
        <div className={css.modal_content} onClick={(e) => e.stopPropagation()}>
          <AiOutlineClose onClick={closeModalWindow} className={css.endBtn} size={30}/>
          {children}
        </div>
      </div>
  )
}

export default Modal
