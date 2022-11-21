
import { useGetData } from './hooks/useGetData';
import './App.css';
import { Genres } from './components/Genres/Genres';
function App() {
  // categories
  const categoriesURL = 'https://the-trivia-api.com/api/categories'
  const [categoriesData,categoriesLoading,categoriesError] = useGetData(categoriesURL)


  return (
    <div className="app">
       <Genres/>
    </div>
  );
}

export default App;
