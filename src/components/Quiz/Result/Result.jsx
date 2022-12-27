import React, { useEffect } from "react";
import css from './Result.module.scss'
import css2 from '../Questions/Questions.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { GetRandomInt } from "../../../redux-toolkit/asyncСreators/LoadQuestions";
import { modalSlice } from "../../../redux-toolkit/reducers/ModalReducer";
import { RenderTimeFormat } from "../../../utils/RenderTimeFormat";
import { isMobile } from "react-device-detect";

const Result = ({time}) => {
    const {CORRECT_ANSWERS,Questions} = useSelector(state => state.questions)
    const dispatch = useDispatch()
    const DISABLE_MODAL_WINDOW = modalSlice.actions.DISABLE_MODAL_WINDOW
    // all diffculties has same length of messages
    const messages = new Map()
    messages.set('bad',[
        "It's always important to analyse your mistakes!",
        'Try one more time!',
    ])
    messages.set('normal',[
        'Definetly not a bad result!',
        'You can do better!',
    ])
    messages.set('good',[
        'Well done!',
        'You did a good job!',
    ])
    const maxLength = messages.get('bad').length
    const randomInt = GetRandomInt(maxLength)
    // using sessionStorage,so when component re-renders the answer is same,that was for the first time
    const messageInMemory = sessionStorage.getItem('resultMessage')
    const message = messageInMemory ? messageInMemory :  CORRECT_ANSWERS?.length / Questions.length <= 0.5 ? messages.get('bad')[randomInt] : CORRECT_ANSWERS.length <= 0.75 ? messages.get('normal')[randomInt] : messages.get('good')[randomInt]
    if (!messageInMemory){
        sessionStorage.setItem('resultMessage',message)
    }
    return(
        <div className={css.container}>
            {message}
            <div/>
            Your result : {CORRECT_ANSWERS?.length}/{Questions?.length}
            <div/>
            <div style={{'display':"flex"}}>time left : <RenderTimeFormat timeInSeconds={time}/></div>
            <button onClick={() => dispatch(DISABLE_MODAL_WINDOW())} style={{'width':isMobile ? 25+'vw' : 20 +'vw','height':20+'vh'}} className={css2.buttonAnswer}>show answers</button>
        </div>
    )
}
export default Result