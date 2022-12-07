import { useSelector } from "react-redux"

const useFinishGame = (allQuestions=[]) => {
    if (!Array.isArray(allQuestions) || (Array.isArray(allQuestions) && !allQuestions.length)) return;
    const COMPLETED_QUESTONS = useSelector(state => state.stateReducer.COMPLETED_QUESTONS)
    
}