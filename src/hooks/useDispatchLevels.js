import { useDispatch,useSelector} from "react-redux";
import { useEffect,useState } from "react";
import { stateSlice } from "../redux-toolkit/reducers/stateReducer";

const useDispatchLevels = () => {
    const dispatch = useDispatch()
    const metaData = useSelector(state => state.metaDataReducer.metaData)
    const [levels,setLevels] = useState([])
    const SET_LEVELS = stateSlice.actions.SET_LEVELS
    useEffect(() => {
        if (!metaData) return;
        const byDifficulty = metaData?.byDifficulty
        if (!byDifficulty) return;
        let tempArray = []
        Object.entries(byDifficulty).map(([name,value]) => {
          if (name === 'null' || !name) return;
          if (tempArray.includes(name)) return;
          tempArray.unshift(name)
        })
        if (Array.isArray(tempArray) && tempArray.length === 3){
          tempArray[0] = 'easy'
          tempArray[1] = 'medium'
          tempArray[2] = 'hard'
        }
        setLevels(tempArray)
        dispatch(SET_LEVELS(tempArray))
    },[metaData])
    // return all possible levels
    return levels
}

export default useDispatchLevels