import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
 
import Icon from '../../data/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '../../data/data'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillList } from '../../store/modules/dataStore'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
const New = () => {
    const [img,setImage]=useState(false)
    const [text,setText]=useState(false)
    const [active,setActive]=useState('pay')//pay-支出 income-收入
    const [money,setMoney]=useState(0)//获取money
    const [time,setTime]=useState()//获取时间
    const handClick=(value)=>{
        setMoney(value)
    }
    const [useFor,setUseFor]=useState('')//获取useFor
   const dispatch=useDispatch()
   //保存数据
   const saveBill=()=>{
    if(img===text){
      const data={
            type:active,
            money:active==='pay'?-money:+money,
            date:time ,
            useFor:useFor
        }
        dispatch(addBillList(data))
    }
        
    }

   //时间打开与关闭
   const [dataVisible,setDataVisible]=useState(false) 
  
   const onConfirm=(data)=>{
      console.log(data);
      setTime(data)
   }
  const navigate = useNavigate()
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(active==='pay'?'selected':'' )}
            onClick={()=>{setActive('pay')  }}
          >
            支出
          </Button>
          <Button
            className={classNames(active==='income'?'selected':'')}
            shape="rounded"
            onClick={()=>{setActive('income')}}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={()=>setDataVisible(true)}>{ dayjs(time).format('YYYY-MM-DD')}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                precision='day'
                onCancel={()=>setDataVisible(false)}
                onConfirm={onConfirm}
                onClose={()=>setDataVisible(false)}
                visible={dataVisible}
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money>=0?money : 0.00}
                onChange={handClick}
                onClick={()=>setText(true)}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[active].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                       useFor===item.type&&'selected' ,''
                      )}
                      key={item.type}
                      onClick={()=>setUseFor(item.type)}
                    >
                      <div className="icon" onClick={()=>setImage(true)}>
                        <Icon type={item.type}  />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
       {<Button className="btn save" onClick={()=>saveBill() }>
          保 存
        </Button> }  
      </div>
    </div>
  )
}

export default New