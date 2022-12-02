
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalSlice } from '../../redux-toolkit/reducers/ModalReducer'
import css from './Modal.module.scss'
const Modal  = ({children}) => {
  const {CHANGE_MODAL_STATE} = modalSlice.actions
  const showModal = useSelector(state => state.modal.showModal)
  const dispatch = useDispatch()
  const rootClasses = showModal ? [css.modal,css.active] : [css.modal]
  return (
      <div className={rootClasses.join(' ')} onClick={() => dispatch(CHANGE_MODAL_STATE())}>
        <div className={css.modal_content} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
  )
}

export default Modal
