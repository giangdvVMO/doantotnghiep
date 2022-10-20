export const checkMail = (mail) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(mail)
}

export const checkPhone = (phone) => {
    const regex = /^0[1-9][0-9]{8,9}$/;
    return regex.test(phone)
}

export const checkUsername = (username) => {
    const regex = /^\w{2,50}$/;
    return regex.test(username);
}

export const checkPassword = (password) => {
    if (password.length < 8) {
        return false;
    }
    return true;
}

export const checkRole = (role) => {
    if (role === '') {
        return false;
    }
    return true;
}

export const checkFullName = (fullname) => {
    if (fullname.length === 0 || fullname.length > 50) {
        return false;
    }
    return true;
}

export const checkBirthday = (birthday) => {
    const now = new Date();
    const year = new Date(birthday).getFullYear();
    const month = new Date(birthday).getMonth();
    const day = new Date(birthday).getDate();
    let age = now.getFullYear() - year;
    if (now.getMonth() > month || (now.getMonth() === month && now.getDate() > day)) {
        age = age - 1;
    }
    if (age < 18) {
        return false;
    }
    return true;
}

export const checkConfirmPass = (password, confirm) => {
    return (confirm === password);
}

export const checkUniversity = (university) => {
    return university!=='';
}

export const checkFaculty = (faculty) => {
    return faculty!=='';
}

export const checkCourse = (course) => {
    const value = course.split('-');
    try{
        if(value.length<2||!+value[0]||!+value[1]){
            return false;
        }
    }catch{
        return false;
    }
    return true;
}

export const checkCCCD = (cccd) => {
    console.log(cccd.length);
    if(!cccd||(cccd.length!==9&&cccd.length!==12)){
        return false;
    }
    return true;
}

export const checkAddress = (address) => {
    return address!=='';
}

export const checkCardStudent = (cardStudent) => {
    return cardStudent!=='';
}

export const checkMajor = (major) => {
    return major!=='';
}

export const checkGPA = (gpa) => {
    console.log('gpa', parseFloat(gpa) );
    if(!gpa||!parseFloat(gpa)||parseFloat(gpa)<0||parseFloat(gpa)>4){
        return false;
    }
    return true;
}