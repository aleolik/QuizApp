
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalSlice } from '../../redux-toolkit/reducers/ModalReducer'
import SideBar from '../SideBar/SideBar'
import css from './Modal.module.scss'
import {AiOutlineClose} from 'react-icons/ai'
const Modal  = ({children}) => {
  const {CHANGE_MODAL_STATE} = modalSlice.actions
  const showModal = useSelector(state => state.modal.showModal)
  const dispatch = useDispatch()
  const rootClasses = [css.modal]
  if (showModal) rootClasses.push(css.active)

  // handlers
  const closeModalWindow = () => {
    dispatch(CHANGE_MODAL_STATE())
  }
  return (
      <div className={rootClasses.join(' ')} onClick={closeModalWindow}>
        <div className={css.modal_content} onClick={(e) => e.stopPropagation()}>
          <AiOutlineClose onClick={closeModalWindow} className={css.endBtn} size={30}/>
          <SideBar/> {/* can be in children element,but since i use modal component only for 1 purpose
          so i decided to put it here.
           */}
          {children}
        </div>
      </div>
  )
}

export default Modal
