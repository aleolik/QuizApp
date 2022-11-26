import axios from "axios"
import { MetaDataSlice } from "../reducers/MetaDataReducer"
import ErrorChecker from '../../utils/errorChecker'
export const LoadMetaData = () => {
    return async(dispatch,getState) => {
        const MetaDataURL = 'https://the-trivia-api.com/api/metadata'
        const {LOAD_META_DATA,LOAD_META_DATA_SUCCESS,LOAD_META_DATA_ERROR} = MetaDataSlice.actions
        dispatch(LOAD_META_DATA())
        setTimeout(() => {
            axios.get(MetaDataURL).then((res) => {
                if (res?.status === 200){
                    const resData = res?.data
                    // resData is an object with objects inside 
                    dispatch(LOAD_META_DATA_SUCCESS(resData))
                }
                else{   
                    const statusTextMessage = res?.statusText ? res.statusText : 'Unknown error!'
                    dispatch(LOAD_META_DATA_ERROR(statusTextMessage))
                }
            }).catch((err) => {
                const message = ErrorChecker(err)   
                dispatch(LOAD_META_DATA_ERROR(message))
            })
        }, 600);
    }
}