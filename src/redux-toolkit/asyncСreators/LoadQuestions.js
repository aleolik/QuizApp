import axios from "axios"
import ErrorChecker from '../../utils/errorChecker'
import { QuestionSlice } from "../reducers/QuestionsReducer"
import { shuffleArray } from "../../utils/shuffleArray"
export const GetRandomInt = (maxNum) => {
    return Math.floor(Math.random() * maxNum)
}
export const GetNumsForLevels = (chosenLevels,NUM_OF_QUESTIONS=20) => {
    if (chosenLevels.length === 1){
        return [NUM_OF_QUESTIONS]
    }
    if (chosenLevels.length === 2){
        const firstInt = GetRandomInt(NUM_OF_QUESTIONS)
        const secondInt = NUM_OF_QUESTIONS - firstInt
        return [firstInt,secondInt]
    }
    if(chosenLevels.length === 3){
        const firstInt = GetRandomInt(Math.floor(NUM_OF_QUESTIONS/2))
        const secondInt = GetRandomInt(Math.floor(NUM_OF_QUESTIONS/2))
        const thridInt = NUM_OF_QUESTIONS - secondInt - firstInt
        return [firstInt,secondInt,thridInt]
    }
}
export const LoadQuestions = () => {
    return async(dispatch,getState) => {
        const NUM_OF_QUESTIONS = getState().stateReducer.chosenNumOfQuestins
        const {chosenLevels,chosenCategories} = getState().stateReducer
        const ChosenCategoriesToLowerCase = []
        // ---- PROCESSING CATEGORIES IN NEEDED FORM ----
        for (let i = 0;i<chosenCategories.length;i++){
            const LowerCaseCategory = chosenCategories[i].toLowerCase().split(' ')
            for (let j = 0;j<LowerCaseCategory.length;j++){
                console.log(LowerCaseCategory.length)
                if (LowerCaseCategory[j] === ' '){
                    LowerCaseCategory[j] = '_'
                }
                if (LowerCaseCategory[j]  === '&'){
                    LowerCaseCategory[j] = 'and'
                }
            }
            ChosenCategoriesToLowerCase.push(LowerCaseCategory.join('_'))
        }
        const {LoadQuestions,LoadQuestionsError,LoadQuestionsSuccess} = QuestionSlice.actions
        // ---- URL LOGIC --
        let QuestionURL = `https://the-trivia-api.com/api/questions?categories=${chosenCategories.join(',')}`
        const NumsForLevels = GetNumsForLevels(chosenLevels,NUM_OF_QUESTIONS)
        console.log(NumsForLevels,'nums')
        const FirstQuestionURL = `https://the-trivia-api.com/api/questions?categories=${ChosenCategoriesToLowerCase.join(',')}&limit=${NumsForLevels[0]}&difficulty=${chosenLevels[0]}`
        let SecondQuestionURL;
        let thirdQuestionURL;
        if (chosenLevels.length > 1){
            SecondQuestionURL = `https://the-trivia-api.com/api/questions?categories=${ChosenCategoriesToLowerCase.join(',')}&limit=${NumsForLevels[1]}&difficulty=${chosenLevels[1]}`
        }
        if (chosenLevels.length > 2){
            thirdQuestionURL = `https://the-trivia-api.com/api/questions?categories=${ChosenCategoriesToLowerCase.join(',')}&limit=${NumsForLevels[2]}&difficulty=${chosenLevels[2]}`
        }
        // ---- ASYNC CALLS ---
        // ---- FIRST CALL WILL BE ALWAYS
        dispatch(LoadQuestions())
        try{
            let ArrOfQuestions = []
            const firstRes = await axios.get(FirstQuestionURL)
            const firstData = firstRes?.data
            firstData.forEach(element => {
                ArrOfQuestions.push(element)
            });
            if (SecondQuestionURL){
                const secondRes = await axios.get(SecondQuestionURL)
                const secondData = secondRes?.data
                secondData.forEach(element => {
                    ArrOfQuestions.push(element)
                });
            }
            if (thirdQuestionURL){
                const thirdRes = await axios.get(thirdQuestionURL)
                const thirdData = thirdRes?.data
                thirdData.forEach(element => {
                    ArrOfQuestions.push(element)
                });
            }
            ArrOfQuestions.forEach((question,i) => {
                let AllAnswers = []
                const incorrectAnswers = question['incorrectAnswers']
                const correctAnswer = question['correctAnswer']
                if (Array.isArray(incorrectAnswers)){
                    AllAnswers = [...incorrectAnswers,correctAnswer]
                    AllAnswers = shuffleArray(AllAnswers)
                }
                question['AllAnswers'] = AllAnswers
                ArrOfQuestions[i] = question
            })
            setTimeout(() => {
                dispatch(LoadQuestionsSuccess(ArrOfQuestions))
                
            }, 1200);
        }
        catch(err){
            const message = ErrorChecker(err)
            dispatch(LoadQuestionsError(message))
        } 
    }
}