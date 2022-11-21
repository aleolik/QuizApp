
import { useGetData } from './hooks/useGetData';
import './App.css';
import CategoriesAndLevels from './components/CategoriesAndLevels/CategoriesAndLevels';
function App() {
  // categories
  const categoriesURL = 'https://the-trivia-api.com/api/categories'
  const [categoriesData,categoriesLoading,categoriesError] = useGetData(categoriesURL)


  return (
    <div className="app">
       <CategoriesAndLevels/>
    </div>
  );
}

export default App;
