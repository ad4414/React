import classNames from 'classnames'
import './index.scss'
import { useMemo, useState } from 'react'
import {billTypeToName} from '../../../../data/data'
import Icon from '../../../../data/Icon'
const DailyBill = ({date,billList}) => {
    const [visible,setVisible]=useState(false)
    const billTotal=useMemo(()=>{
        if( billList){
            let pay=billList.filter((item)=>item.type==='pay').reduce((a,c)=>a+c.money,0)
        let income= billList.filter((item)=>item.type==='income').reduce((a,c)=>a+c.money,0)
        return {pay,income}  
      }else{
         let pay=0
         let income=0
         return {
          pay,income
         }
      }
       },[ billList])
       const handClick=()=>{
        setVisible(!visible)
       }
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{ date}</span>
           
          <span onClick={handClick}className={classNames('arrow',visible && 'expand')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{billTotal.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{ billTotal.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{(billTotal.income+billTotal.pay).toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
        {/* 单日列表 */}
     {visible &&
        <div className="billList">
       {billList.map(item => {
    return (
      <div className="bill" key={item.id}>
        <Icon type={item.useFor}/>
        <div className="detail">
          <div className="billType">{billTypeToName[item.useFor]}</div>
        </div>
        <div className={classNames('money', item.type)}>
          {item.money.toFixed(2)}
        </div>
      </div>
    )
  })}
</div>
     }   
    </div>
  )
}
export default DailyBill