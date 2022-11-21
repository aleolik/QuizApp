import React from 'react'
import './LevelOfQuestions.css'


const LevelOfQuestions = () => {
  // categories
  const categoriesURL = 'https://the-trivia-api.com/api/categories'
  const [categoriesData,categoriesLoading,categoriesError] = useGetData(categoriesURL)
  useEffect(() => {
    if (!metaData) return;
    const byCategory = metaData?.byCategory
    if (!byCategory) return;
    setCategories(byCategory)
    console.log(byCategory)
    Object.entries(byCategory).map(([name,value]) => {
      if (chosenCategories.includes(name)) return;
      dispatch(ADD_CATEGORY(name))
    })
  },[metaData])
  return (
    <div>LevelOfQuestions</div>
  )
}

export default LevelOfQuestions