import React from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Categories from "../Categories/Categories"
import {LoadMetaData} from '../../redux-toolkit/asyncСreators/LoadMetaData'
import Levels from "../Levels/Levels"
const CategoriesAndLevels = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(LoadMetaData())
    },[])
    return(
      <div>
         <Categories/>
         <Levels/>
      </div>
    )
}

export default CategoriesAndLevels