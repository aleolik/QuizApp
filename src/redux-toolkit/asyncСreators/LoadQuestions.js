import axios from "axios"
import { MetaDataSlice } from "../reducers/MetaDataReducer"
import ErrorChecker from '../../utils/errorChecker'
import { QuestionSlice } from "../reducers/QuestionsReducer"

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
        const firstInt = GetRandomInt(NUM_OF_QUESTIONS/2)+1 // [1,10]
        const secondInt = GetRandomInt(NUM_OF_QUESTIONS/2)+1 // [1,10]
        const thridInt = NUM_OF_QUESTIONS - secondInt - firstInt
        return [firstInt,secondInt,thridInt]
    }
}
export const LoadQuestions = () => {
    return async(dispatch,getState) => {
        const NUM_OF_QUESTIONS = 20
        const {chosenLevels,chosenCategories} = getState().stateReducer
        const ChosenCategoriesToLowerCase = []
        // ---- PROCESSING CATEGORIES IN NEEDED FORM ----
        for (let i = 0;i<chosenCategories;i++){
            const LowerCaseCategory = chosenLevels[i].toLowerCase()
            for (let j = 0;i<LowerCaseCategory.length;j++){
                if (LowerCaseCategory[j] === '&' || LowerCaseCategory[j] === ' '){
                    let newStr;
                    if (LowerCaseCategory[j] === '&'){
                        newStr = LowerCaseCategory[j].slice(0,j)+'and'+LowerCaseCategory[j+1].slice
                        ChosenCategoriesToLowerCase.push(newStr)
                        return;
                    }
                    newStr = LowerCaseCategory[j].slice(0,j)+'_'+LowerCaseCategory[j+1].slice
                    ChosenCategoriesToLowerCase.push(newStr)
                    return;
                }
            }
        }
        const {LoadQuestions,LoadQuestionsError,LoadQuestionsSuccess} = QuestionSlice.actions
        // ---- URL LOGIC --
        let QuestionURL = `https://the-trivia-api.com/api/questions?categories=${chosenCategories.join(',')}`
        const NumsForLevels = GetNumsForLevels(chosenLevels,NUM_OF_QUESTIONS)
        console.log(ChosenCategoriesToLowerCase,NumsForLevels)
        console.log(ChosenCategoriesToLowerCase.join(','))
        const FirstQuestionURL = `https://the-trivia-api.com/api/questions?categories=${chosenCategories.join(',')}&limit=${NumsForLevels[0]}&difficulty=${chosenLevels[0]}`
        let SecondQuestionURL;
        let thirdQuestionURL;
        if (chosenLevels.length > 1){
            SecondQuestionURL = `https://the-trivia-api.com/api/questions?categories=${chosenCategories.join(',')}&limit=${NumsForLevels[1]}&difficulty=${chosenLevels[1]}`
        }
        if (chosenLevels.length > 2){
            thirdQuestionURL = `https://the-trivia-api.com/api/questions?categories=${chosenCategories.join(',')}&limit=${NumsForLevels[2]}&difficulty=${chosenLevels[2]}`
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