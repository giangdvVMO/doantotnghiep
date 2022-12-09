import { Button, Image, Input, message, Select, Table, Tag } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {decodeToken} from 'react-jwt';

import { UserContext } from '../User/UserProvider';
import '../../styles/manager-page.css'
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, MinusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { serverURL } from '../../configs/server.config';
import { DateToShortStringDate, openNotificationWithIcon, postFields } from '../../common/service';

const { Option } = Select;
const { TextArea } = Input;
export const RecruitManager = () => {
    const { user, changeUser, token } = useContext(UserContext);
    const navigate = useNavigate();
    
    const [fields, setFields] = useState([]);
    const [field, setField] = useState([]);
    const [status, setStatus] = useState(-1);
    const [search, setSearch] = useState('');
    const [listRecruit, setListRecruit] = useState([]);

    //fetch Fields
    async function fetchField(){
        const url = serverURL + 'field';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            );
            const result = await response.json();
           // console.log(result);
            if(response.status!==200){
                message.error(result.message);
            }else{
                if (result.data === "empty") {
                    const manuList = postFields();
                    setFields(manuList);
                  }
                setFields(result.data);
            }
        }
        catch (err) {
           // console.log(err);
            message.error("Đã có lỗi xảy ra!");
        }
}

    async function fetchListRecruit(){
        if(user){
        let query = '?id_company='+ user._id;
                query = status!==-1? query+'&status='+status:query;
                query = field.length && !field.includes(-1)? query+'&field='+field:query;
                query = search!==''? query+'&search='+search:query;
                const url = serverURL + 'recruit'+ query;
               // console.log(query);
                try {
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
                       // console.log("result",result)
                        setListRecruit(result.data);
                    }
                }
                catch (err) {
                   // console.log(err);
                }
            }
    }
    //fetch user
    const fetchUser = async()=>{
       // console.log('fetch user account')
        const tokenx = token? token: window.localStorage.getItem('accessToken');
       // console.log('tokenx', tokenx);
        const id = decodeToken(tokenx).sub;
       // console.log("id",id);
        const url = serverURL + 'account/'+id;
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                );
                const result = await response.json();
                if(response.status!==200){
                    message.error("Lỗi hệ thống load user!");
                }else{
                 // console.log("user fetch to set role", result)
                  if(!result||result.role!=='company'){
                      message.warn('Bạn ko có quyền xem trang này');
                      navigate('/')
                  }
                    changeUser({...result})
                }
            }
            catch (err) {
               // console.log(err);
            }
    }
    async function fetchCompany() {
        try {
          if (user) {
            const _id = user._id;
            const url = serverURL + "company/" + _id;
            const response = await fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const result = await response.json();
            if (response.status !== 200) {
              message.error("Lỗi hệ thống!");
            } else {
             // console.log("result", result);
              if (result.data === "empty") {
                openNotificationWithIcon('warning', 'Cảnh báo', 'Bạn hãy cập nhật thông tin công ty để sử dụng chức năng này.')
                navigate("/company-profile");
              }else{
                if(result.data.status === false){
                  openNotificationWithIcon('warning', 'Cảnh báo', 'Thông tin của bạn chưa được duyệt nhé!')
                  navigate("/home");
                  return;
              }
              }
            }
          }
        } catch (err) {
         // console.log(err);
        }
      }

    useEffect(()=>{fetchUser()},[]);
    useEffect(()=>{fetchCompany()},[]);
    useEffect(()=>{fetchField();},[]);
    useEffect(()=>{fetchListRecruit();},[field, status, search, user])
    const columns = [
        {
            title: 'STT',
            key: '_id',
            width: 80,
            fixed: 'left',
            render: (_, record, index)=>{
                return <div>{index+1}</div>
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            width: 150,
            key: 'title',
        },
        {
            title: 'Phương thức làm việc',
            dataIndex: 'way_working',
            key: 'way_working',
        },
        {
            title: 'Lương',
            width: 120,
            key: 'salary',
            render:(_,record)=>{
                return <div style={{textAlign: 'right'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.salary)}</div>
            }
        },
        {
            title: 'Số lượng tuyển',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Cấp bậc',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: 'Giới tính',
            // dataIndex: 'gender',
            key: 'gender',
            render:(_,record)=>{
                return <div style={{textAlign: 'center'}}>{record.gender?record.gender: 'Không yêu cầu'}</div>
            }
        },
        {
            title: 'Địa chỉ làm việc',
            dataIndex: 'address_working',
            key: 'address_working',
        },
        {
            title: 'Kinh nghiệm',
            dataIndex: 'experience',
            key: 'experience',
        },
        {
            title: 'Mô tả công việc',
            key: 'description',
            width: 200,
            render: (_,record) =>{ 
                return <TextArea value={record.description} bordered={false}/>
            }
        },
        {
            title: 'Yêu cầu',
            key: 'requirement',
            width: 200,
            render: (_,record) =>{ 
                return <TextArea value={record.requirement} bordered={false}/>
            }
        },
        {
            title: 'Quyền lợi',
            // dataIndex: 'welfare',
            key: 'welfare',
            width: 200,
            render: (_,record) =>{ 
                return <TextArea value={record.welfare} bordered={false}/>
            }
        },
        {
            title: 'Ngày kết thúc',
            key: 'end_date',
            render: (_,record) =>{ 
                return record.end_date? <>{DateToShortStringDate(record.end_date)}</>:''
            }
        },
        {
            title: 'Lĩnh vực',
            key: 'fields',
            render: (_,record) =>{ return (<>{
                record.fields.map((manu) => {return(
                    <Tag className="tag" color="cyan">{manu.nameField}</Tag>)
                })
            }</>)
            }
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (_, record) => {
                return (new Date(record.end_date) < new Date()? 
                <Tag icon={<ClockCircleOutlined />} color="default">Hết hạn</Tag>
                :
                record.status? 
                <Tag icon={<CheckCircleOutlined />} color="success">Đã duyệt</Tag>
                :
                <Tag icon={<ExclamationCircleOutlined />} color="warning">Chưa duyệt</Tag>
              )
              },
            fixed: 'right',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Link to={`../recruit/${record._id}`}>Xem chi tiết</Link>
            ),
            fixed: 'right',
        },
    ];
    const handleChangeField = (e)=>{
       // console.log(e);
        const value = e.map(item=>{
            return item.value
        })
        setField([...value]);
    }

    const handleChangeSelect = (e)=>{
        setStatus(e.value);
    }
    const handleChangeSearch = (e)=>{
        setSearch(e.target.value);
    }

    return (
        <>
            <div className='banner-content'>
                <div className="text-banner">Quản lý danh sách bài đăng</div>
                <Image className="image-background-banner" src="https://i.ibb.co/c1S06fB/Interview-amico.png" preview={false}/>
            </div>
            <div className='container-filter'>
                <div className='filter'>
                    <label className='label-filter'>Lĩnh vực bài đăng:</label>
                    <Select
                    mode='multiple'
                        value={field}
                        defaultValue='Tất cả'
                        labelInValue='Lĩnh vực bài đăng'
                        className='filter-content'
                        onChange={handleChangeField}
                    >
                        <Option value={-1}>Tất cả</Option>
                        {
                            fields.map((field)=>{
                                return (<Option key={field._id} value={field._id}>{field.nameField}</Option>)
                            })
                        }
                    </Select>
                </div>
                <div className='filter'>
                    <label className='label-filter'>Trạng thái:</label>
                    <Select
                        value={status}
                        defaultValue='Tất cả'
                        labelInValue='Trạng thái'
                        className='filter-content'
                        onChange={handleChangeSelect}
                    >
                        <Option value={-1}>Tất cả</Option>
                        <Option value={1}>duyệt</Option>
                        <Option value={0}>chưa duyệt</Option>
                    </Select>
                </div>
                <div className='filter'>
                    <label className='transparent'>Tìm kiếm</label>
                    <div className='search'>
                        <Input className='input search-input' placeholder='Nhập thông tin cần tìm' value={search} onChange={handleChangeSearch}>
                        </Input>
                        <Button type="primary" icon={<SearchOutlined />}>
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
            </div>
            <Table 
                dataSource={listRecruit} 
                columns={columns} 
                scroll={{
                    x: 2000,
                    y: 800,
                }}
            />
        </>
    )
}
