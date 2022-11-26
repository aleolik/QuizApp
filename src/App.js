
import { useGetData } from './hooks/useGetData';
import './App.css';
import CategoriesAndLevels from './components/CategoriesAndLevels/CategoriesAndLevels';
import PlayButton from './components/PlayButton/PlayButton';
import { useSelector } from 'react-redux';
import Questions from './components/Questions/Questions';
function App() {
  // categories
  const categoriesURL = 'https://the-trivia-api.com/api/categories'
  const [categoriesData,categoriesLoading,categoriesError] = useGetData(categoriesURL)

  const inGame = useSelector(state => state.stateReducer.InGame)

  return (
    <div className="app">
        <h1 className='purples' style={{'textAlign':'center','marginBottom':0.3+'vh'}}>Trivia App</h1>
        {inGame
        ? (
          <Questions/>
        )
        : (
          <div>
              <CategoriesAndLevels/>
              <PlayButton/>
          </div>
        )}
    </div>
  );
}

export default App;
