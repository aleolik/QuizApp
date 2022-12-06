
import './App.css';
import PlayButton from './components/PlayButton/PlayButton';
import { useDispatch, useSelector } from 'react-redux';
import Questions from './components/Questions/Questions';
import {AiFillSetting} from 'react-icons/ai'
import { modalSlice } from './redux-toolkit/reducers/ModalReducer';
import Modal from './components/Modal/Modal';
import Categories from './components/Categories/Categories';
import {LoadMetaData} from './redux-toolkit/asyncСreators/LoadMetaData'
import React,{useEffect} from 'react'
import useDispatchCategoires from './hooks/useDispatchCategories';
import useDispatchLevels from './hooks/useDispatchLevels';
import Levels from './components/Levels/Levels';
import Time from './components/Time/Time';
import NumberOfQuestions from './components/NumberOfQuestions/NumberOfQuestions';
import BG from './media/bg.png'
function App() {
  // categories
  const dispatch = useDispatch()
  const {CHANGE_MODAL_STATE} = modalSlice.actions
  const inGame = useSelector(state => state.stateReducer.InGame)
  const {showModal,currentSetting} = useSelector(state => state.modal)
  const {metaData,metaDataError,metaDataLoading} = useSelector(state => state.metaDataReducer)

  useEffect(() => {
    // load MetaData
    dispatch(LoadMetaData())
  },[])
  // dispatch categories
  const AllCategories = useDispatchCategoires()
  // dispatch levels
  const AllLevels = useDispatchLevels()
  // handlers
  const SettingsOnClick = () =>{
    if (metaDataLoading || metaDataError) return;
    dispatch(CHANGE_MODAL_STATE())
  }



  return (
    <div className="app" style={{'backgroundImage':inGame ? 'none' : `url(${BG})`,'backgroundRepeat':'no-repeat'}}>
        {showModal
         && (
          <Modal>
            {currentSetting === 'Categories' && (
                <Categories AllCategories={AllCategories}/>
            )}
             {currentSetting === 'Levels' && (
                <Levels AllLevels={AllLevels}/>
            )}
            {currentSetting === 'Time' && (
              <Time/>
            )}
            {currentSetting === 'NumberOfQuestions' && (
              <NumberOfQuestions/>
            )}
          </Modal>
        )}
          <>
             <div className='purples centerdDiv' style={{'fontSize':25,'marginBottom':0.5+'vh'}}>Trivia App</div>
             {inGame
              ? (
                <Questions/>
              )
              : (
                <div>
                    <div className='centerdDiv'><AiFillSetting  onClick={SettingsOnClick} size={60} className='settingsBtn'></AiFillSetting></div>
                    <PlayButton/>
                </div>
              )}
          </>
    </div>
  );
}

export default App;
