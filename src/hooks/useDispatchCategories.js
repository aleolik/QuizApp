import { useDispatch,useSelector} from "react-redux";
import { useEffect,useState } from "react";
import { stateSlice } from "../redux-toolkit/reducers/stateReducer";

const useDispatchCategoires = () => {
    const dispatch = useDispatch()
    const metaData = useSelector(state => state.metaDataReducer.metaData)
    const {ADD_CATEGORY,REMOVE_CATEGORY,SET_CATEGORIES} = stateSlice.actions
    const [categories,setCategories] = useState({})
    useEffect(() => {
        if (!metaData) return;
        const byCategory = metaData?.byCategory
        if (!byCategory) return;
        let tempArray = []
        Object.entries(byCategory).map(([name,value]) => {
          if (tempArray.includes(name)) return;
          tempArray.unshift(name)
         })
         dispatch(SET_CATEGORIES(tempArray))
         setCategories(tempArray)
    },[metaData])

    // return all possible categories
    return categories
}

export default useDispatchCategoires