import { message } from "antd";
import {socket} from '../App';
import { serverURL } from "../configs/server.config";
export const DateToShortString = (dateString)=>{
    console.log(dateString);
    const date = new Date(dateString);
    return date.getDate() +'/'+(date.getMonth()+1)+'/'+date.getFullYear();
}

export const DateToShortStringDate = (dateString)=>{
    const date = new Date(dateString);
    return date.getDate() +'/'+(date.getMonth()+1)+'/'+date.getFullYear();
}

export const createNoti = async(id_send, id_receive, title, type, content, link)=>{
        try {
            const url = serverURL + 'noti';
            const data = {
                "title": title,
                "type": type,
                "content": content,
                "send_id": id_send,
                "receive_id":  id_receive,
                "link": link
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
            );
            const result = await response.json();
            if(response.status!==201){
                message.error("Lỗi hệ thống!");
            }else{
                if(!result){
                    message.warning('Cập nhật không thành công, hãy kiểm tra lại!');
                }else{
                    socket.emit('sendNoti',{receive: id_receive[0]});
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

export const getUserAdmin = async()=>{
    try {
        const url = serverURL + 'account?role=admin';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        );
        const result = await response.json();
        if(response.status!==200){
            message.error("Lỗi hệ thống!");
        }else{
            if(result.data.length){
                return result.data.map((item)=>{
                    return item._id;
                });
            }
            return [];
        }
    }
    catch (err) {
        console.log(err);
    }
}

export const formatDate = (datex)=>{
    const date = new Date(datex)
    const currentDate = new Date();
    const year = currentDate.getFullYear()-date.getFullYear();
    const month = currentDate.getMonth()-date.getMonth();
    const day = currentDate.getDate()-date.getDate();
    const hour = currentDate.getHours()-date.getHours();
    const minutes = currentDate.getMinutes()-date.getMinutes();
    const seconds = currentDate.getSeconds()-date.getSeconds();
    if(year>0){
        return `${year} năm trước`
    }
    if(month>0){
        return `${month} tháng trước`
    }
    if(day>0){
        return `${day} ngày trước`
    }
    if(hour>0){
        return `${hour} giờ trước`
    }
    if(minutes>0){
        return `${minutes} phút trước`
    }
    return `${seconds} giây trước`
}

export const changeExperience = (experience)=>{
    if(experience===0){
        return 'Không yêu cầu kinh nghiệm'
    }
    if(experience<12){
        return 'Dưới 1 năm kinh nghiệm'
    }
    if(experience<12*2){
        return 'Dưới 2 năm kinh nghiệm'
    }
    return 'Trên 2 năm kinh nghiệm'
}