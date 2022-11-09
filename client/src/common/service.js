export const DateToShortString = (dateString)=>{
    console.log(dateString);
    const date = new Date(dateString);
    return date.getDate() +'/'+(date.getMonth()+1)+'/'+date.getFullYear();
}

export const DateToShortStringDate = (dateString)=>{
    const date = new Date(dateString);
    return date.getDate() +'/'+(date.getMonth()+1)+'/'+date.getFullYear();
}

export const createNoti = (id_send, id_account, title, type, content)=>{
    
}

export const formatDate = (date)=>{
    console.log('date', date);
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