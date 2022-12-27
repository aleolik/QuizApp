import css from './Quiz.module.scss'
import css2 from './Questions/Questions.module.scss'
import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import LoaderForQuestions from '../LoaderForQuestions/LoaderForQuestions'
import { stateSlice } from '../../redux-toolkit/reducers/stateReducer'
import {Timer} from '../Timer/Timer'
import Warning from '../Warning/Warning'
import {useFinishTest} from '../../hooks/useFinishTest'
import Result from './Result/Result'
import SelectorsComponent from './Selectors/Selectors'
import QuestionsComponent from './Questions/Questions'
import Modal from '../Modal/Modal'
import { isMobile } from 'react-device-detect'

const Quiz =  () => {
    const dispatch = useDispatch()
    const {Questions,loadQuestions,QuestionsError,CORRECT_ANSWERS,UNCORRECT_ANSWERS,COMPLETED_QUESTONS} = useSelector(state => state.questions)
    const [showWarning,setShowWarning] = useState(false)
    const showModal = useSelector(state => state.modal.showModal)

    const testFinished = CORRECT_ANSWERS.length > 0 || UNCORRECT_ANSWERS.length > 0

    // vars for Timer,not in time because i need to store time left globally,but not in redux or memory
    const startTime = useSelector(state => state.stateReducer.chosenTime) 
    const [time,setTime] = useState(startTime*60)
    const [interValID,SetInterValID] = useState(null)

    const finishTest = useFinishTest(Questions)

    const endTest = () => {
        if (COMPLETED_QUESTONS.length !== Questions.length && !testFinished){
            setShowWarning(true) 
            return;  
        }
        if (!finishTest) return;
        finishTest(interValID,SetInterValID)
    }
    return(
        <div style={{'display':'flex','alignItems':'center','height':'inherit','width':'inherit','flexDirection':'column'}}>
            {loadQuestions && !QuestionsError
            ? (
                <LoaderForQuestions/>
            )
            : (
                <>
                    <Warning showWarning={showWarning} setShowWarning={setShowWarning} givenText={'You must answer all questions!'}/>
                    {QuestionsError
                    ? (
                        <div className={css.error}>{QuestionsError}</div>
                    )
                    : (
                        <div className={css.container}>
                            {showModal && testFinished
                            ? (
                                <div>
                                    <Modal>
                                        <Result time={time}/>
                                    </Modal>
                                </div>
                            )
                            : (
                             <div>
                                {!testFinished ? (
                                    <Timer interValID={interValID} SetInterValID={SetInterValID} time={time} setTime={setTime} testFinished={testFinished}/>
                                )
                                : (
                                    <></>
                                )}
                                <SelectorsComponent testFinished={testFinished}/>
                                <div className={css.containerOfQuestion}>
                                    <QuestionsComponent testFinished={testFinished}/>
                                    <button style={{'width':isMobile ? 25+'vw' : 20+'vw','height':20+'vh'}} onClick={endTest} className={css2.buttonAnswer}>{testFinished ? 'Show results': 'Finish Test'}</button>
                                </div>
                            </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Quiz