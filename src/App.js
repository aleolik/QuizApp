
import './App.scss';
import {useSelector } from 'react-redux';
import QuestionsComponent from './components/Quiz/Quiz';
import React from 'react'
import MainMenu from './pages/MainMenu/MainMenu';
function App() {
  const inGame = useSelector(state => state.stateReducer.inGame)
  const loadQuestions = useSelector(state => state.questions.loadQuestions)

  return (
    <div className="app">
       <div className='centerdDiv' style={{'fontSize':25,'marginBottom':0.5+'vh'}}>Trivia App</div>
        {inGame || loadQuestions
        ? (
          <QuestionsComponent/>)
        : (
          <div>
              <MainMenu/>
          </div>
        )}
    </div>
  );
}

export default App;
