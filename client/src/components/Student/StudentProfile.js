import { BulbOutlined, CheckCircleOutlined, MailOutlined, MinusCircleOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, DatePicker, Form, Input, InputNumber, message, Modal, Select, Tag } from "antd";
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

import { serverURL } from "../../configs/server.config";
import { UserContext } from "../User/UserProvider"
import '../../styles/form.css'
import '../../styles/my-account.css'
import { universities } from "../../data/university-list";
import { checkAddress, checkBirthday, checkCardStudent, checkCCCD, checkCourse, checkFaculty, checkFullName, checkGPA, checkMail, checkMajor, checkPhone, checkUniversity } from "../../common/validation";
import { messageSignUpError, messageStudentError } from "../../common/error";
import { DateToShortString } from "../../common/service";
import * as moment from 'moment';
const { Option } = Select;

let students = {
    _id:-1,
    cccd: '',
    address: '',
    university: '',
    faculty: '',
    course: '',
    gpa: '',
    status: '',
    avatar: '',
    card_student: '',
    major: ''
}

export const StudentProfile = ()=>{
    const {user, changeUser} = useContext(UserContext);
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    if(!user){
        navigate('/sign-in');
    }
    const [account, setAccount] = useState(user);
    const [student, setStudent] = useState(students)
    const defaultTrueStatus = {
        status: 'success',
        errorMsg: null
    }

    async function fetchStudent(){
        try {
            const _id = account._id;
            const url = serverURL + 'student/'+ _id;
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
                console.log("result",result);
                if(result.data==='empty'){
                    setOpenModal(true);
                }else{
                    setStudent(result);
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchStudent();
    },[]);

    const [validateFullname,setValidateFullname] = useState(defaultTrueStatus);
    const [validatePhone,setValidatePhone] = useState(defaultTrueStatus);
    const [validateEmail,setValidateEmail] = useState(defaultTrueStatus);
    const [validateCCCD,setValidateCCCD] = useState(defaultTrueStatus);
    const [validateAddress,setValidateAddress] = useState(defaultTrueStatus);
    const [validateCardStudent,setValidateCardStudent] = useState(defaultTrueStatus);
    const [validateUniversity,setValidateUniversity] = useState(defaultTrueStatus);
    const [validateFaculty,setValidateFaculty] = useState(defaultTrueStatus);
    const [validateMajor,setValidateMajor] = useState(defaultTrueStatus);
    const [validateCourse,setValidateCourse] = useState(defaultTrueStatus);
    const [validateGPA,setValidateGPA] = useState(defaultTrueStatus);
    const [validateBirthday, setValidateBirthday] = useState(defaultTrueStatus);

    const ref = useRef();
    const refUserName = useRef();
    const refButtonSubmit = useRef();

    async function handleEdit(e){
        setIsEdit(true);
        return;
    }

    async function handleCancel(e){
        setIsEdit(false);
        return;
    }
    function handleKeyUp(e) {
        if (e.keyCode === 13) {
            console.log('enter');
            refButtonSubmit.current.focus();
            refButtonSubmit.current.click();
        }
    }

    function checkMailFunc(email) {
        if (!checkMail(email)) {
            setValidateEmail({
                status: 'error',
                errorMsg: messageSignUpError.email
            })
            return false;
        } else {
            setValidateEmail(defaultTrueStatus)
            return true;
        }
    }

    function checkPhoneFunc(phone) {
        if (!checkPhone(phone)) {
            setValidatePhone({
                status: 'error',
                errorMsg: messageSignUpError.phone
            })
            return false;
        } else {
            setValidatePhone(defaultTrueStatus)
            return true;
        }
    }

    function checkFullNameFunc(fullname) {
        if (!checkFullName(fullname)) {
            setValidateFullname({
                status: 'error',
                errorMsg: messageSignUpError.fullname
            })
            return false;
        } else {
            setValidateFullname(defaultTrueStatus)
            return true;
        }
    }

    function checkBirthdayFunc(birthday) {
        if (!checkBirthday(birthday)) {
            setValidateBirthday({
                status: 'error',
                errorMsg: messageSignUpError.birthday
            })
            return false;
        } else {
            setValidateBirthday(defaultTrueStatus)
            return true;
        }
    }

    function checkUniversityFunc(university) {
        if (!checkUniversity(university)) {
            setValidateUniversity({
                status: 'error',
                errorMsg: messageStudentError.university
            })
            return false;
        } else {
            setValidateUniversity(defaultTrueStatus)
            return true;
        }
    }

    function checkFacultyFunc(faculty) {
        if (!checkFaculty(faculty)) {
            setValidateFaculty({
                status: 'error',
                errorMsg: messageStudentError.faculty
            })
            return false;
        } else {
            setValidateFaculty(defaultTrueStatus)
            return true;
        }
    }

    function checkCourseFunc(Course) {
        if (!checkCourse(Course)) {
            setValidateCourse({
                status: 'error',
                errorMsg: messageStudentError.course
            })
            return false;
        } else {
            setValidateCourse(defaultTrueStatus)
            return true;
        }
    }

    function checkCCCDFunc(CCCD) {
        if (!checkCCCD(CCCD)) {
            setValidateCCCD({
                status: 'error',
                errorMsg: messageStudentError.CCCD
            })
            return false;
        } else {
            setValidateCCCD(defaultTrueStatus)
            return true;
        }
    }

    function checkAddressFunc(Address) {
        if (!checkAddress(Address)) {
            setValidateAddress({
                status: 'error',
                errorMsg: messageStudentError.Address
            })
            return false;
        } else {
            setValidateAddress(defaultTrueStatus)
            return true;
        }
    }
    function checkCardStudentFunc(CardStudent) {
        if (!checkCardStudent(CardStudent)) {
            setValidateCardStudent({
                status: 'error',
                errorMsg: messageStudentError.CardStudent
            })
            return false;
        } else {
            setValidateCardStudent(defaultTrueStatus)
            return true;
        }
    }
    function checkMajorFunc(Major) {
        if (!checkMajor(Major)) {
            setValidateMajor({
                status: 'error',
                errorMsg: messageStudentError.Major
            })
            return false;
        } else {
            setValidateMajor(defaultTrueStatus)
            return true;
        }
    }
    function checkGPAFunc(GPA) {
        if (!checkGPA(GPA)) {
            setValidateGPA({
                status: 'error',
                errorMsg: messageStudentError.GPA
            })
            return false;
        } else {
            setValidateGPA(defaultTrueStatus)
            return true;
        }
    }
    
     function checkChangeAccount(){
        if(account.fullname!==user.fullname||account.email!==user.email||
            account.phone!==user.phone||account.birthday!==user.birthday){
                return true;
            }
            return false;
    }

    async function fetchAccount(){
        try {
            const url = serverURL + 'account/'+ account._id;
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
                console.log("result",result)
                setAccount(result);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async function updateAccount(){
        const url = serverURL + 'account/'+account._id;
            try {
                const response = await fetch(url, {
                    method: 'PATCH',
                    body: JSON.stringify(account)
                }
                );
                const result = await response.json();
                console.log(result);
                if(response.status!==200){
                    message.error(result.message);
                }else{
                    message.success("Bạn đã sửa thành công!");
                    setIsEdit(false);
                }
            }
            catch (err) {
                console.log(err);
                message.error("Đã có lỗi xảy ra!");
            }
            fetchAccount();
    }

    async function updateStudent(){
        const url = serverURL + 'student/'+account._id;
            try {
                const response = await fetch(url, {
                    method: 'PATCH',
                    body: JSON.stringify(student)
                }
                );
                const result = await response.json();
                console.log(result);
                if(response.status!==200){
                    message.error(result.message);
                }else{
                    message.success("Bạn đã sửa thành công!");
                    setIsEdit(false);
                }
            }
            catch (err) {
                console.log(err);
                message.error("Đã có lỗi xảy ra!");
            }
            fetchStudent();
    }
    async function handleSave(e) {
        ref.current.submit();
        let count =0;
        count = checkFullNameFunc(account.fullname) ? count : count + 1;
        count = checkMailFunc(account.email) ? count : count + 1;
        count = checkPhoneFunc(account.phone) ? count : count + 1;
        count = checkUniversityFunc(student.university) ? count : count + 1;
        count = checkFacultyFunc(student.faculty) ? count : count + 1;
        count = checkCourseFunc(student.course) ? count : count + 1;
        count = checkCCCDFunc(student.cccd) ? count : count + 1;
        count = checkAddressFunc(student.address) ? count : count + 1;
        count = checkCardStudentFunc(student.card_student) ? count : count + 1;
        count = checkBirthdayFunc(account.birthday) ? count : count + 1;
        count = checkMajorFunc(student.major) ? count : count + 1;
        count = checkGPAFunc(student.gpa) ? count : count + 1;
        console.log(count);
        if(count===0){
            if(checkChangeAccount()){
                updateAccount();
            }
            updateStudent();
        }
        return;
    }

    async function handleCancel(e) {
        setIsEdit(false);
        fetchAccount();
        fetchStudent();
        return;
    }

    const renderButtonGroup = ()=>{
        if(!isEdit){
            return (
                <Button type='submit' className='button edit-btn' onClick={handleEdit}>Sửa</Button>
            )
        }else{
            return (
                <>
                <Button type='submit' className='button save-btn' onClick={handleSave}>Lưu</Button>
                <Button type='reset' className='button cancel-btn' onClick={handleCancel}>Hủy</Button>
                </>
            )
        }
    }

    const renderStatus = ()=>{
        if(account.status){
            return (
            <Tag icon={<CheckCircleOutlined />} 
                color="success">
                Đã duyệt
            </Tag>)
        }else{
            return (
                <Tag icon={<MinusCircleOutlined />} color="default">
                    Chưa duyệt
                </Tag>
            )
        }
    }

    
    function handleChangeFullName(e) {
        setAccount((preUser) => { return { ...preUser, fullname: e.target.value } });
    }

    function handleChangeEmail(e) {
        console.log(e.target.value);
        setAccount((preUser) => { return { ...preUser, email: e.target.value } });
    }

    function handleChangePhone(e) {
        setAccount((preUser) => { return { ...preUser, phone: e.target.value } });
    }

    function handleChangeFaculty(e) {
        setStudent((preStudent) => { return { ...preStudent, faculty: e.target.value } });
    }

    function handleChangeCourse(e) {
        setStudent((preStudent) => { return { ...preStudent, course: e.target.value } });
    }

    function handleChangeCCCD(e) {
        setStudent((preStudent) => { return { ...preStudent, cccd: e.target.value } });
    }

    function handleChangeAddress(e) {
        setStudent((preStudent) => { return { ...preStudent, address: e.target.value } });
    }
    
    function handleChangeCardStudent(e) {
        setStudent((preStudent) => { return { ...preStudent, card_student: e.target.value } });
    }
    function handleChangeBirthday(date, dateString) {
        setAccount((preStudent) => { return { ...preStudent, birthday: dateString } });
    }
    function handleChangeGPA(e) {
        setStudent((preStudent) => { return { ...preStudent, gpa: +e.value } });
    }

    const [selectedUniversity, setSelectedUniversity] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');
    const OPTIONS = universities;

    return (<div className='swapper-container'>
        <div className='introduce-frame'>
            <div className='background-image'></div>
            <div className='introduce-bottom'>
                <Avatar className='avatar' size= {120} icon={<UserOutlined />} />
                <div className='introduce-fullname'>{account.fullname}</div>
            </div>
        </div>
        <div className='detail-swapper'>
            <p className='title-account'>Thông tin sinh viên</p>
            <div className='underline'></div>
            <div className='body'>
            <Form
                    ref={ref}
                    onKeyUp={handleKeyUp}
                    className='form'
                    name="basic"
                    layout='vertical'
                    // initialValues={{ ...account }} 
                    autoComplete="off"
                >
                    <div className='two-colums'>
                        <Form.Item
                            label="Họ và tên"
                            name="fullname"
                            initialValue={account.fullname}
                            validateStatus={validateFullname.status}
                            help={validateFullname.errorMsg}
                            className='label'
                        >
                            {
                                isEdit?
                                <Input
                                    disabled={!isEdit}
                                    className='input-login max-width'
                                    placeholder="Nhập họ và tên"
                                    autoFocus={true}
                                    value={account.fullname}
                                    onChange={handleChangeFullName}
                                />
                                :
                                <p className="text-display">{account.fullname}</p>
                            }
                            
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            initialValue={account.email}
                            validateStatus={validateEmail.status}
                            help={validateEmail.errorMsg}
                            className='label'
                        >
                            {
                                isEdit?
                                <Input
                                    className='input-login max-width'
                                    placeholder="Nhập Email"
                                    type='email'
                                    disabled={!isEdit}
                                    autoFocus={true}
                                    prefix={<MailOutlined className='input-icon' />}
                                    value={account.email}
                                    onChange={handleChangeEmail}
                                />
                                :
                                <p className="text-display">{account.email}</p>
                            }
                            
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            initialValue={account.phone}
                            validateStatus={validatePhone.status}
                            help={validatePhone.errorMsg}
                            className='label'
                        >
                            {
                                isEdit?
                                <Input
                                    className='input-login max-width'
                                    placeholder="Nhập Số điện thoại"
                                    autoFocus={true}
                                    disabled={!isEdit}
                                    prefix={<><PhoneOutlined className='input-icon' /></>}
                                    value={account.phone}
                                    onChange={handleChangePhone}
                                />
                                :
                                <p className="text-display">{account.phone}</p>
                            }
                            
                        </Form.Item>
                        <Form.Item
                            label="Trường"
                            name="university"
                            initialValue={student.university}
                            className='label'
                            validateStatus={validateUniversity.status}
                            help={validateUniversity.errorMsg}
                        >
                            {
                                isEdit?
                                <Select
                                    showSearch
                                    value={selectedUniversity}
                                    optionFilterProp="children"
                                    onChange={setSelectedUniversity}
                                    style={{ width: '100%' }}
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                >
                                {
                                    OPTIONS.map(item => (
                                        <Option key={item} value={item}>
                                        {item}
                                        </Option>
                                    ))
                                }
                                </Select>
                                :
                                <p className="text-display">{student.university}</p>
                            }
                        </Form.Item>
                        <Form.Item
                            label="Khoa"
                            name="faculty"
                            initialValue={student.faculty}
                            validateStatus={validateFaculty.status}
                            help={validateFaculty.errorMsg}
                            className='label'
                        >
                            {
                                isEdit?
                                <Input
                                    className='input-login max-width'
                                    placeholder="Nhập khoa"
                                    autoFocus={true}
                                    disabled={!isEdit}
                                    value={student.faculty}
                                    onChange={handleChangeFaculty}
                                />
                                :
                                <p className="text-display">{student.university}</p>
                            }
                        </Form.Item>
                        <Form.Item
                            label="Chuyên ngành"
                            name="major"
                            className='label'
                            initialValue={student.major}
                            validateStatus={validateMajor.status}
                            help={validateMajor.errorMsg}
                        >
                            {
                                isEdit?
                                <Select
                                    showSearch
                                    value={selectedMajor}
                                    optionFilterProp="children"
                                    onChange={setSelectedMajor}
                                    style={{ width: '100%' }}
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                >
                                {
                                    OPTIONS.map(item => (
                                        <Option key={item} value={item}>
                                        {item}
                                        </Option>
                                    ))
                                }
                                </Select>
                                :
                                <p className="text-display">{student.major}</p>
                            }
                        </Form.Item>
                        <Form.Item
                            label="Khóa học"
                            name="course"
                            initialValue={student.course}
                            validateStatus={validateCourse.status}
                            help={validateCourse.errorMsg}
                            className='label'
                        >
                            {
                                isEdit?
                                <Input
                                    className='input-login max-width'
                                    placeholder="Nhập khóa học"
                                    autoFocus={true}
                                    disabled={!isEdit}
                                    value={student.course}
                                    onChange={handleChangeCourse}
                                />
                                :
                                <p className="text-display">{student.course}</p>
                            }
                        </Form.Item>
                        <Form.Item
                            label="CCCD"
                            name="cccd"
                            initialValue={student.cccd}
                            validateStatus={validateCCCD.status}
                            help={validateCCCD.errorMsg}
                            className='label'
                        >
                            {
                                isEdit?
                                <Input
                                    className='input-login max-width'
                                    placeholder="Nhập CCCD"
                                    autoFocus={true}
                                    disabled={!isEdit}
                                    value={student.cccd}
                                    onChange={handleChangeCCCD}
                                />
                                :
                                <p className="text-display">{student.cccd}</p>
                            }
                        </Form.Item>
                        <Form.Item
                            label="Quê quán"
                            name="address"
                            initialValue={student.address}
                            validateStatus={validateAddress.status}
                            help={validateAddress.errorMsg}
                            className='label'
                        >
                            {
                                isEdit?
                                <Input
                                    className='input-login max-width'
                                    placeholder="Nhập quê quán"
                                    autoFocus={true}
                                    disabled={!isEdit}
                                    value={student.address}
                                    onChange={handleChangeAddress}
                                />
                                :
                                <p className="text-display">{student.address}</p>
                            }
                        </Form.Item>
                        <Form.Item
                            label="Mã sinh viên"
                            name="card_student"
                            initialValue={student.card_student}
                            validateStatus={validateCardStudent.status}
                            help={validateCardStudent.errorMsg}
                            className='label'
                        >
                            {
                                isEdit?
                                <Input
                                    className='input-login max-width'
                                    placeholder="Nhập mã sinh viên"
                                    autoFocus={true}
                                    disabled={!isEdit}
                                    value={student.card_student}
                                    onChange={handleChangeCardStudent}
                                />
                                :
                                <p className="text-display">{student.card_student}</p>
                            }
                        </Form.Item>
                        <Form.Item
                            label="Ngày sinh"
                            name="birthday"
                            validateStatus={validateBirthday.status}
                            help={validateBirthday.errorMsg}
                            className='label'
                        >
                            {
                                isEdit?
                                <DatePicker className='birthday-input'
                                    autoFocus={true}
                                    defaultValue= {moment(moment(account.birthday),'DD/MM/YYYY')}
                                    value={account.birthday}
                                    onChange={handleChangeBirthday} />
                                :
                                <p className="text-display">{DateToShortString(account.birthday)}</p>
                            }
                        </Form.Item>
                        <Form.Item
                            label="GPA"
                            name="gpa"
                            initialValue={student.gpa}
                            validateStatus={validateGPA.status}
                            help={validateGPA.errorMsg}
                            className='label'
                        >
                            {
                                isEdit?
                                <InputNumber
                                    className='input-login max-width'
                                    style={{width: '100%'}}
                                    placeholder="Nhập GPA"
                                    min={0}
                                    max={4}
                                    step={0.01}
                                    autoFocus={true}
                                    disabled={!isEdit}
                                    value={student.gpa}
                                    onChange={handleChangeGPA}
                                />
                                :
                                <p className="text-display">{student.gpa}</p>
                            }
                        </Form.Item>
                        <Form.Item name='status' label="Trạng thái"
                                >
                                    <div className='status'>{
                                        renderStatus()
                                    }</div>
                        </Form.Item> 
                        <Form.Item>
                            <div>
                                <BulbOutlined className="warnings" color="yellow" size={40}/>
                                <span>Hãy cập nhật thông tin đầy đủ để có thể sử dụng các chức năng của hệ thống!</span>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <div className='group-button'>
                                {
                                    renderButtonGroup()
                                }
                            </div>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
        <Modal  title="Xác nhận" open={isOpenModal} onOk={()=>setOpenModal(false)} onCancel={()=>setOpenModal(false)}>
            <p>Bạn hãy cập nhật thông tin để sử dụng các chức năng website!</p>
        </Modal>
        </div>
    )
}