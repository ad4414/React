import { createSlice }  from '@reduxjs/toolkit'
import axios from 'axios'
 
 
const dataStore=createSlice({
    name:'data',
    initialState:{
         dataMoney:[]
    },
    reducers:{
        setBillData(state,actions){
            state.dataMoney=actions.payload
        },
        //添加数据
        addBill(state,action){
            state.dataMoney.push(action.payload)
        }
    }
})
//异步请求部分
 
const {setBillData,addBill}=dataStore.actions
let reducer=dataStore.reducer
const fetchData=()=>{
    return async (dispatch)=>{
     const res=await axios.get('http://localhost:8888/ka')
    dispatch(setBillData(res.data))
     
    }
}
//异步请求
let addBillList=(data)=>{
    return async (dispatch)=>{
        const res=await axios.post('http://localhost:8888/ka',data)
        dispatch(addBill(res.data))
    }
}
 
export {fetchData,addBillList}
export default  reducer