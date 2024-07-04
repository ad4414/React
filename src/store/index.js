import {configureStore} from '@reduxjs/toolkit'
//导入子模块reducer
 
import moneyReducer  from "./modules/dataStore";
 
let store= configureStore({
    reducer:{
        money:moneyReducer
    }
})
export default store