import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import  {fetchData}  from '../../store/modules/dataStore'
import _, { keys }   from 'lodash'
import dayjs from 'dayjs'
import YearBill from './compontes/YearBill/YeartBill'
const Year = () => {
  const dataMoney=useSelector(state=>state.money.dataMoney)//获取数据
  const [yearList,setYearList]=useState([])//创建年份数组
  const billList=useMemo(()=>{
      return _.groupBy(dataMoney,(item)=>dayjs(item.date).format('YYYY'))
  },[dataMoney])//按照年份分组
  console.log(billList);
    const [dataVisible,setDataVisible]=useState(false)
    const [selectTime,setSelectorTime]=useState(new Date())
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(fetchData())
    },[dispatch])
    const onConfirm=(data)=>{
       setDataVisible(false)
      setSelectorTime(data)
      const formatTime=dayjs(data).format('YYYY')
      setYearList(billList[formatTime])
    } 
    //计算金额
     const billTotal=useMemo(()=>{
      if(yearList){
          let pay=yearList.filter((item)=>item.type==='pay').reduce((a,c)=>a+c.money,0)
      let income=yearList.filter((item)=>item.type==='income').reduce((a,c)=>a+c.money,0)
      return {pay,income}  
    }else{
       let pay=0
       let income=0
       return {
        pay,income
       }
    }        
     },[yearList])
      //直接显示
      useEffect(()=>{
        const nowDate=dayjs().format('YYYY')
         setYearList(billList[nowDate])
     },[billList])
     //按年分类
     const yearGroup=useMemo(()=>{
        const yearGroupList= _.groupBy(yearList,(item)=>dayjs(item.date).format('YYYY-MM'))
        const keys=Object.keys(yearGroupList)
        return  {yearGroupList,keys}
     },[yearList])
     console.log(yearGroup);
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        年度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={()=>setDataVisible(true) }  >
            <span className="text" >
              { selectTime.getFullYear()}年
            </span>
            <span className={classNames('arrow', dataVisible&&'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
     <div className="item">
         <span className="money">{billTotal.pay.toFixed(2) }</span>
         <span className="type">支出</span>
       </div>
       <div className="item">
         <span className="money">{billTotal.income.toFixed(2) }</span>
         <span className="type">收入</span>
       </div>
       <div className="item">
         <span className="money">{(billTotal.pay+billTotal.income).toFixed(2) }</span>
         <span className="type">结余</span>
       </div>
     </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="year"
            visible={dataVisible}
           onCancel={()=>setDataVisible(false)}
           onConfirm={onConfirm}
            max={new Date()}
            onClose={()=>setDataVisible(false)}
          />
        </div>
        {yearGroup.keys.map((item)=>{
            return  <YearBill key={item} date={item} billList={yearGroup.yearGroupList[item]}/>
        })}
      
      </div>
    </div >
  )
}

export default Year