import { CheckCircleOutlined, MinusCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Modal, Tag } from "antd";
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

import { UserContext } from "../User/UserProvider"
import '../../styles/form.css'
import '../../styles/my-account.css'
import { DateToShortString } from "../../common/service";
import TextArea from "antd/lib/input/TextArea";

let students = {
    _id:1,
    cccd: "19378273828",
    address: "HP",
    university: "University",
    faculty: "English",
    course: "2012-2020",
    gpa: 3.5,
    status: false,
    avatar: '',
    card_student: '18A100100',
    major: 'Công nghệ phần mềm'
}

export const StudentDetail = ()=>{
    const {user} = useContext(UserContext);
    let users= user?user:{
        _id: 1,
        username: "giang",
        password: "12345678",
        fullname: "giang",
        email: "123@gmail.com",
        birthday: "2000-12-12",
        phone: "0866023111",
        role: "student",
        status: 1
    }
    const [isOpen, setOpen] = useState(false);
    const [account, setAccount] = useState(users);
    const [student, setStudent] = useState(students);
    const [reason, setReason] = useState('');

    const navigate = useNavigate();
    const role = user? user.role:"admin";
    if(role==="student"){
        navigate('/page-not-found');
    }
    const {id} = useParams();
    useEffect(
        ()=>{
        
        }
    )
    
    console.log(account);
    const ref = useRef();
    const refButtonSubmit = useRef();

    async function handleAccept(e){

    }
    async function handleReject(e){
        setOpen(true);
        return;
    }
    async function handleSubmit(){

    }
    async function handleCancel(){
        setOpen(false);
    }
    async function handleChangeReason(e){
        setReason(e.target.value);
        return;
    }
    function handleKeyUp(e) {
        if (e.keyCode === 13) {
            console.log('enter');
            refButtonSubmit.current.focus();
            refButtonSubmit.current.click();
        }
    }

    const renderButtonGroup = ()=>{
        return (
            <>
                <Button type='submit' className='button save-btn' onClick={handleAccept}>Duyệt</Button>
                <Button className='button reject-btn' onClick={handleReject}>Từ chối</Button>
            </>
        )
    }

    const renderStatus = ()=>{
        if(student.status){
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
                    autoComplete="off"
                >
                    <div className='two-colums'>
                        <Form.Item
                            label="Họ và tên"
                            name="fullname"
                            initialValue={account.fullname}
                            className='label'
                        >
                                <p className="text-display">{account.fullname}</p>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            initialValue={account.email}
                            className='label'
                        >
                                <p className="text-display">{account.email}</p>
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            initialValue={account.phone}
                            className='label'
                        >
                                <p className="text-display">{account.phone}</p>
                        </Form.Item>
                        <Form.Item
                            label="Trường"
                            name="university"
                            initialValue={student.university}
                            className='label'
                        >
                                <p className="text-display">{student.university}</p>
                        </Form.Item>
                        <Form.Item
                            label="Khoa"
                            name="faculty"
                            initialValue={student.faculty}
                            className='label'
                        >
                                <p className="text-display">{student.university}</p>
                        </Form.Item>
                        <Form.Item
                            label="Chuyên ngành"
                            name="major"
                            className='label'
                            initialValue={student.major}
                        >
                                <p className="text-display">{student.major}</p>
                        </Form.Item>
                        <Form.Item
                            label="Khóa học"
                            name="course"
                            initialValue={student.course}
                            className='label'
                        >
                                <p className="text-display">{student.course}</p>
                        </Form.Item>
                        <Form.Item
                            label="CCCD"
                            name="cccd"
                            initialValue={student.cccd}
                            className='label'
                        >
                                <p className="text-display">{student.cccd}</p>
                        </Form.Item>
                        <Form.Item
                            label="Quê quán"
                            name="address"
                            initialValue={student.address}
                            className='label'
                        >
                                <p className="text-display">{student.address}</p>
                        </Form.Item>
                        <Form.Item
                            label="Mã sinh viên"
                            name="card_student"
                            initialValue={student.card_student}
                            className='label'
                        >
                                <p className="text-display">{student.card_student}</p>
                        </Form.Item>
                        <Form.Item
                            label="Ngày sinh"
                            name="birthday"
                            className='label'
                        >
                                <p className="text-display">{DateToShortString(account.birthday)}</p>
                        </Form.Item>
                        <Form.Item
                            label="GPA"
                            name="gpa"
                            initialValue={student.gpa}
                            className='label'
                        >
                                <p className="text-display">{student.gpa}</p>
                        </Form.Item>
                        <Form.Item name='status' label="Trạng thái"
                                >
                                    <div className='status'>{
                                        renderStatus()
                                    }</div>
                        </Form.Item> 
                        
                    </div>
                    <Form.Item>
                            <div className='group-button'>
                                {
                                    student.status?
                                    '':
                                    renderButtonGroup()
                                }
                            </div>
                        </Form.Item>
                </Form>
                </div>
            </div>
            <Modal title='Xác nhận từ chối' open={isOpen} footer={null}>
                <label>Lý do từ chối</label>
                <TextArea 
                    className='input-login max-width'
                    placeholder="Nhập lí do"
                    autoFocus={true}
                    rows={6}
                    defaultValue={reason}
                    value={reason}
                    onChange={handleChangeReason}
                    />
                    <br/>
                    <div className='group-button'>
                        <Button type='submit' className='button save-btn' onClick={handleSubmit}>Từ chối</Button>
                        <Button type='reset' className='button cancel-btn' onClick={handleCancel}>Hủy</Button>
                    </div>
            </Modal>
        </div>
    )
}