import { Avatar, Comment, Rate, Tooltip } from "antd"
import { DateToShortStringDate, formatDate } from "../../common/service"

export const RateCommentList  =  ({list})=>{
    return (
        list.map(rate=>{
            console.log('rate', rate)
            return (
                <Comment
                    author={rate.account.fullname}
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                    content={<>
                        <div>
                       {rate.content}
                        </div>
                        <Rate disabled defaultValue={rate.score} count={10}/>
                    </>
                        
                    }
                    datetime={
                        <Tooltip title={DateToShortStringDate(rate.create_date)}>
                        <span>{formatDate(rate.create_date)}</span>
                        </Tooltip>
                    }
                    />
            )
        })
    )
}