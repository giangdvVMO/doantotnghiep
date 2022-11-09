import { IdcardTwoTone, MoneyCollectTwoTone } from '@ant-design/icons'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { changeExperience, DateToShortStringDate } from '../../common/service';
import '../../styles/card.css'

export const CardList = ({listRecruit})=>{
return (
  listRecruit.map((item)=> {
    const classCss = item._id%2===0?'card red': 'card green';
    const twoToneColor = item._id%2===0?'#dE685E': '#325C46';
    return (
    <>
  <div class={classCss}>
    <div class="additional">
      <div class="user-card">
        <div class="level center-card">
          {
            changeExperience(item.experience)
          }
        </div>
        <Avatar className='avatar' src='https://joeschmoe.io/api/v1/random'/>
        {
          item.fields.map((field, index)=>{
            if(index<2){
              return (
                <div class="points center-card">
                  {field.nameField}
                </div>
              )
            }
            if(index===2){
              return (
                <div class="points center-card">
                  {`+${item.fields.length-2} lĩnh vực`}
                </div>
              )
            }
            return ''
          })
        }
      </div>
      <div class="more-info">
        <h1>{item.title}</h1>
        <div class="coords">
          <span>Ngày bắt đầu tuyển</span>
          <span>{DateToShortStringDate(item.start_date)}</span>
        </div>
        <div class="coords">
          <span>Hạn tuyển dụng</span>
          <span>{DateToShortStringDate(item.end_date)}</span>
        </div>
        <div class="stats">
          <div>
            <div class="titlecard">Số lượng</div>
            <IdcardTwoTone size={10} twoToneColor={twoToneColor} />
            <div class="value">{item.quantity}</div>
          </div>
          <div>
            <div class="titlecard">Lương</div>
            <MoneyCollectTwoTone size={10} twoToneColor={twoToneColor} />
            <div class="value tiny">{item.salary?item.salary:'Thỏa thuận'}</div>
          </div>
        </div>
        <div class="bottom-button">
          <Link to={`../recruit/${item._id}`}><div class="level">Xem chi tiết</div></Link>
        </div>
      </div>
    </div>
    <div class="general">
      <h1>{item.title}</h1>
      <p>{item.description}</p>
    </div>
  </div>
  </>
  )})
)
}