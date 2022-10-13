import { CheckCircleOutlined, InfoCircleOutlined, KeyOutlined, MailOutlined, MinusCircleOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, DatePicker, Form, Input, message, Modal, Tag, Tooltip } from 'antd';
import { useContext, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as moment from 'moment';

import { messageSignUpError } from '../../common/error';
import { DateToShortString } from '../../common/service';
import { checkBirthday, checkFullName, checkMail, checkPassword, checkPhone, checkRole, checkUsername } from '../../common/validation';
import { serverURL } from '../../configs/server.config';
import '../../styles/form.css'
import '../../styles/my-account.css'
import { UserContext } from '../User/UserProvider';

export const DetailAccountAdmin = () => {
    const { user } = useContext(UserContext);
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const {id} = useParams();
    console.log('id:', id);
    const role = user ? user.role : 'student';
    let users = user ? user : {
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
    const date = new Date();
    console.log(date.toISOString());
    const [account, setAccount] = useState({
        _id: users._id,
        username: users.username,
        password: users.password,
        fullname: users.fullname,
        email: users.email,
        birthday: users.birthday,
        phone: users.phone,
        role: users.role,
        status: users.status
    });
    console.log(account);
    const defaultTrueStatus = {
        status: 'success',
        errorMsg: null
    }
    const [validateEmail, setValidateEmail] = useState(defaultTrueStatus);
    const [validatePhone, setValidatePhone] = useState(defaultTrueStatus);
    const [validateUsername, setValidateUsername] = useState(defaultTrueStatus);
    const [validatePassword, setValidatePassword] = useState(defaultTrueStatus);
    const [validateRole, setValidateRole] = useState(defaultTrueStatus);
    const [validateFullname, setValidateFullname] = useState(defaultTrueStatus);
    const [validateBirthday, setValidateBirthday] = useState(defaultTrueStatus);

    const ref = useRef();
    const refUserName = useRef();
    const refButtonSubmit = useRef();
    const navigate = useNavigate();

    //Autocomplete list type: 
    const options = [
        { value: 'company', label: 'Doanh nghiệp' },
        { value: 'student', label: 'Sinh viên' },
    ];

    function handleChangeUserName(e) {
        setAccount((preUser) => { return { ...preUser, username: e.target.value } });
    }

    function handleChangePassword(e) {
        setAccount((preUser) => { return { ...preUser, password: e.target.value } });
    }

    function handleChangeFullName(e) {
        setAccount((preUser) => { return { ...preUser, fullname: e.target.value } });
    }

    function handleChangeBirthday(date, dateString) {
        setAccount((preUser) => { return { ...preUser, birthday: dateString } });
    }

    function handleChangeEmail(e) {
        console.log(e.target.value);
        setAccount((preUser) => { return { ...preUser, email: e.target.value } });
    }

    function handleChangePhone(e) {
        setAccount((preUser) => { return { ...preUser, phone: e.target.value } });
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

    function checkUserNameFunc(username) {
        if (!checkUsername(username)) {
            setValidateUsername({
                status: 'error',
                errorMsg: messageSignUpError.username
            })
            return false;
        } else {
            setValidateUsername(defaultTrueStatus)
            return true;
        }
    }

    function checkPasswordFunc(password) {
        if (!checkPassword(password)) {
            setValidatePassword({
                status: 'error',
                errorMsg: messageSignUpError.password
            })
            return false;
        } else {
            setValidatePassword(defaultTrueStatus)
            return true;
        }
    }

    function checkRoleFunc(role) {
        if (!checkRole(role)) {
            setValidateRole({
                status: 'error',
                errorMsg: messageSignUpError.role
            })
            return false;
        } else {
            setValidateRole(defaultTrueStatus)
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

    async function handleEdit(e) {
        setIsEdit(true);
        return;
    }
    async function handleDelete(e){
        
        return;
    }
    async function handleCancel(e) {
        setIsEdit(false);
        return;
    }

    async function handleChange(e) {
        setIsOpenModal(true);
        return;
    }

    async function handleSave(e) {
        ref.current.submit();
        let count = 0;
        count = checkMailFunc(account.email) ? count : count + 1;
        count = checkPhoneFunc(account.phone) ? count : count + 1;
        count = checkFullNameFunc(account.fullname) ? count : count + 1;
        count = checkPasswordFunc(account.password) ? count : count + 1;
        count = checkRoleFunc(account.role) ? count : count + 1;
        count = checkUserNameFunc(account.username) ? count : count + 1;
        count = checkBirthdayFunc(account.birthday) ? count : count + 1;
        console.log(count);
        if (count === 0) {
            account.phone = '+84' + account.phone;
            const url = serverURL + 'auth/register';
            try {
                // const response = await axios.post(url, account);
                const response = await fetch(url, {
                    method: 'PATCH',
                    body: JSON.stringify(account)
                }
                );

                console.log(response);
                message.success("Bạn đã sửa thành công!")
                navigate('/');
            }
            catch (err) {
                console.log(err);
                message.error("Đã có lỗi xảy ra!");
            }
        }
        setIsEdit(false);
        return;
    }
    const renderButtonGroup = () => {
        if (!isEdit) {
            return (<>
                <Button type='submit' className='button edit-btn' onClick={handleEdit}>Sửa</Button>
                <Button type='submit' className='button delete-btn' onClick={handleDelete}>Xóa</Button>
                </>
            )
        } else {
            return (
                <>
                    <Button type='submit' className='button save-btn' onClick={handleSave}>Lưu</Button>
                    <Button type='reset' className='button cancel-btn' onClick={handleCancel}>Hủy</Button>
                </>
            )
        }
    }

    const renderStatus = () => {
        if (account.status) {
            return (
                <Tag icon={<CheckCircleOutlined />} 
                    color="success">
                    active
                </Tag>)
        } else {
            (
                <Tag icon={<MinusCircleOutlined />} color="default">
                    inactive
                </Tag>
            )
        }
    }

    const renderChangePasswordBtn = () => {
        if (!isEdit) {
            return (
                <Button className='button change-btn' onClick={handleChange}>Đổi</Button>
            )
        }
    }

    return (<div className='swapper-container'>
        <div className='introduce-frame'>
            <div className='background-image'></div>
            <div className='introduce-bottom'>
                <Avatar className='avatar' size={120} icon={<UserOutlined />} />
                <div className='introduce-fullname'>{account.fullname}</div>
            </div>
        </div>
        <div className='detail-swapper'>
            <p className='title-account'>Thông tin tài khoản</p>
            <div className='underline'></div>
            <div className='body'>
                <Form
                    ref={ref}
                    onKeyUp={handleKeyUp}
                    className='form'
                    name="basic"
                    layout='vertical'
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <div className='two-colums'>
                        <Form.Item
                            initialValue={account.username}
                            label="Tên đăng nhập"
                            name="username"
                            className='label'
                            validateStatus={validateUsername.status}
                            help={validateUsername.errorMsg}
                        >
                            {
                                isEdit?
                                <Input
                                    ref={refUserName}
                                    disabled={!isEdit}
                                    className='input-login max-width'
                                    placeholder="Nhập tên đăng nhập"
                                    autoFocus={true}
                                    prefix={<UserOutlined className='input-icon' />}
                                    suffix={
                                        <Tooltip title="Tên đăng nhập là duy nhất">
                                            <InfoCircleOutlined className='input-icon opacity-less'
                                            />
                                        </Tooltip>
                                    }
                                    value={account.username}
                                    onChange={handleChangeUserName}
                                />
                                :
                                <p className="text-display">{account.username}</p>
                            }
                        </Form.Item>
                        <Form.Item
                            label="Họ và tên"
                            name="fullname"
                            className='label'
                            initialValue={account.fullname}
                            validateStatus={validateFullname.status}
                            help={validateFullname.errorMsg}
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
                            className='label'
                            initialValue={account.email}
                            validateStatus={validateEmail.status}
                            help={validateEmail.errorMsg}
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
                            className='label'
                            initialValue={account.phone}
                            validateStatus={validatePhone.status}
                            help={validatePhone.errorMsg}
                        >
                            {
                                isEdit?
                                <Input
                                    className='input-login max-width'
                                    placeholder="Nhập Số điện thoại"
                                    autoFocus={true}
                                    disabled={!isEdit}
                                    prefix={<><PhoneOutlined className='input-icon' /><span>+84 </span></>}
                                    value={account.phone}
                                    onChange={handleChangePhone}
                                />
                                :
                                <p className="text-display">{account.phone}</p>
                            }
                            
                        </Form.Item>
                        <Form.Item
                            label="Ngày sinh"
                            name="birthday"
                            className='label'
                            validateStatus={validateBirthday.status}
                            help={validateBirthday.errorMsg}
                        >
                            {
                                isEdit?
                                <DatePicker className='birthday-input'
                                    autoFocus={true}
                                    disabled={!isEdit}
                                    defaultValue= {moment(moment(account.birthday),'DD/MM/YYYY')}
                                    value={account.birthday}
                                    onChange={handleChangeBirthday} />
                                :
                                <p className="text-display">{DateToShortString(account.birthday)}</p>
                            }
                            
                        </Form.Item>
                        <Form.Item name='role' label="Đối tượng"
                        className='label'
                            validateStatus={validateRole.status}
                            help={validateRole.errorMsg}
                        >
                            <div className='role'>
                                <Tag color="orange">{account.role}</Tag>
                            </div>
                        </Form.Item>
                        <Form.Item name='status' label="Trạng thái"
                            validateStatus={validateRole.status}
                            className='label'
                            help={validateRole.errorMsg}
                        >
                            <div className='status'>{
                                renderStatus()
                            }</div>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <div className='group-button'>
                            {
                                renderButtonGroup()
                            }
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
    )
}