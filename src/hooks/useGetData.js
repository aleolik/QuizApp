import { useEffect, useState } from "react"
import axios from 'axios'
import { ErrorChecker } from "../utils/errorChecker"

export const GET_DATA = async(url='') => {
    const data = await axios.get(url)
    return data
}
export const useGetData = (url='') => {
    const [loading,setLoading] = useState(false)// boolean
    const [error,setErorr] = useState('')// string
    const [data,setData] = useState([])
    useEffect(() => {
        if (url && typeof url === 'string'){
            setLoading(true)
            GET_DATA(url).then((res) => {
                    if (res?.status === 200){
                        const resData = res?.data
                        // resData is an object or array
                        setData(resData)
                    }
                    else{   
                        const statusTextMessage = res?.statusText ? res.statusText : 'Unknown error!'
                        setErorr(statusTextMessage)
                    }
            }).catch((e) => {
                const errorMessage = ErrorChecker(e)
                setErorr(errorMessage)
            }).finally(() => {
                setTimeout(() => {
                  setLoading(false)   
                }, 1200);
            })
        }
    },[])
    /*
        arr[0] - array
        arr[1] - boolean
        arr[2] - string
    */
   return[
    data,loading,error
   ]

}   