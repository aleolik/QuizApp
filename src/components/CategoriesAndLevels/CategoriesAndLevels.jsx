import React from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Categories from "../Categories/Categories"
import {LoadMetaData} from '../../redux-toolkit/asyncСreators/LoadMetaData'
const CategoriesAndLevels = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(LoadMetaData())
    },[])
    return(
      <div>
         <Categories/>
      </div>
    )
}

export default CategoriesAndLevels