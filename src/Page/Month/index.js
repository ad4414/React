import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import {  useSelector } from 'react-redux'
 import DailyBill from './compontes/DayBill/DayBill'
import _ from 'lodash'
import dayjs from 'dayjs'
const Month = () => {
  const dataMoney=useSelector(state=>state.money.dataMoney)//获取数据
  const [monthList,setMonthList]=useState([])
  const billList=useMemo(()=>{
      return _.groupBy(dataMoney,(item)=>dayjs(item.date).format('YYYY-MM'))
  },[dataMoney])//对时间进行分组
    const [dataVisible,setDataVisible]=useState(false)
    const [selectTime,setSelectorTime]=useState(new Date())
    //直接显示
    useEffect(()=>{
      const nowData=dayjs().format('YYYY-MM')
      setMonthList(billList[nowData])
    },[billList])
    //确认回调函数
    const onConfirm=(data)=>{
       setDataVisible(false)
       
      setSelectorTime(data)
      const formatTime=dayjs(data).format('YYYY-MM')
      setMonthList(billList[formatTime])//获取时间分组
    } 
    //计算金额
     const billTotal=useMemo(()=>{
      if(monthList){
          let pay=monthList.filter((item)=>item.type==='pay').reduce((a,c)=>a+c.money,0)
      let income=monthList.filter((item)=>item.type==='income').reduce((a,c)=>a+c.money,0)
      return {pay,income}  
    }else{
       let pay=0
       let income=0
       return {
        pay,income
       }
    }
     },[monthList])
    //当前月按照日来分组 
    const dailyBillList=useMemo(()=>{
      const groupDay= _.groupBy(monthList,(item)=>dayjs(item.date).format('YYYY-MM-DD'))
      const keys=Object.keys(groupDay)
      return {groupDay,keys}
  },[monthList])
  console.log(dailyBillList);
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={()=>setDataVisible(true) }  >
            <span className="text" >
              { selectTime.getFullYear()}年 | {selectTime.getMonth()+1}月
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
            precision="month"
            visible={dataVisible}
           onCancel={()=>setDataVisible(false)}
           onConfirm={onConfirm}
            max={new Date()}
            onClose={()=>setDataVisible(false)}
          />
         
        </div>
         {/*  //单日列表统计数据 */}
         {dailyBillList.keys.map(item=>{
              return     <DailyBill key={item} date={item} billList={dailyBillList.groupDay[item]} />
         })}
     
      </div>
     
    </div >
    
  )
}

export default Month