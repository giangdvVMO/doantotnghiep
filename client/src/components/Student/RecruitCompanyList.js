import { Button, Input, message, Pagination, Select, Spin } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {decodeToken} from 'react-jwt';

import { UserContext } from '../User/UserProvider';
import '../../styles/manager-page.css'
import { SearchOutlined } from '@ant-design/icons';
import { serverURL } from '../../configs/server.config';
import { CardList } from '../Common/Card';
import { postFields } from '../../common/service';

const { Option } = Select;
export const RecruitCompanyListStudent = () => {
    const { user, changeUser, token } = useContext(UserContext);
    const {id} = useParams();
    const navigate = useNavigate();
    
    const [fields, setFields] = useState([]);
    const [field, setField] = useState([]);
    const [experience, setExperience] = useState(-1);
    const [search, setSearch] = useState('');
    const [listRecruit, setListRecruit] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(1)
    const [total, setPageTotal] = useState(1);

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
            console.log(result);
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
            console.log(err);
            message.error("Đã có lỗi xảy ra!");
        }
    }

    async function fetchListRecruit(){
                let query = '?id_company='+id+'&status=1&pageIndex='+pageIndex+'&pageSize='+pageSize;
                query = field.length? query+'&field='+field:query;
                query = experience!==-1? query+'&experience='+experience:query;
                query = search!==''? query+'&search='+search:query;
                const url = serverURL + 'recruit'+ query;
                console.log(query);
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
                        console.log("result",result)
                        setPageTotal(result.total);
                        setListRecruit(result.data);
                    }
                }
                catch (err) {
                    console.log(err);
                }
    }
     //fetch user
     const fetchUser = async()=>{
        console.log('fetch user account')
        const tokenx = token? token: window.localStorage.getItem('accessToken');
        console.log('tokenx', tokenx);
        const id = decodeToken(tokenx).sub;
        console.log("id",id);
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
                  console.log("user fetch to set role", result)
                  if(!result||result.role!=='student'){
                      message.warn('Bạn ko có quyền xem trang này');
                      navigate('/')
                  }
                    changeUser({...result})
                }
            }
            catch (err) {
                console.log(err);
            }
    }

    useEffect(()=>{fetchUser()}, []);
    useEffect(()=>{
        fetchField();
    },[]);
    useEffect(()=>{
        fetchListRecruit();
    },[pageIndex, pageSize,field, experience, search])
    
    const handleChangeField = (e)=>{
        console.log(e);
        const value = e.map(item=>{
            return item.value
        })
        setField([...value]);
        setPageIndex(1);
    }

    const handleChangeSelect = (e)=>{
        setExperience(e.value);
        setPageIndex(1);
    }
    const handleChangeSearch = (e)=>{
        setSearch(e.target.value);
        setPageIndex(1);
    }
    const onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
        setPageIndex(current);
    };
    if(user&&fields){
    return (
        <>
            <div className='banner-content'>Danh sánh bài đăng tuyển dụng</div>
            <div className='container-filter'>
                <div className='filter'>
                    <label className='label-filter'>Lĩnh vực bài đăng:</label>
                    <Select
                    mode='multiple'
                        value={field}
                        defaultValue='all'
                        labelInValue='Lĩnh vực bài đăng'
                        className='filter-content'
                        onChange={handleChangeField}
                    >
                        {
                            fields.map((field)=>{
                                return (<Option key={field._id} value={field._id}>{field.nameField}</Option>)
                            })
                        }
                    </Select>
                </div>
                <div className='filter'>
                    <label className='label-filter'>Kinh nghiệm:</label>
                    <Select
                        value={experience}
                        defaultValue='all'
                        labelInValue='Trạng thái'
                        className='filter-content'
                        onChange={handleChangeSelect}
                    >
                        <Option value={-1}>Tất cả</Option>
                        <Option value={0}>Không yêu cầu</Option>
                        <Option value={1}>Dưới 1 năm</Option>
                        <Option value={2}>Từ 1 tới 5 năm</Option>
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
            <div className='list-container'>
                <CardList listRecruit={listRecruit} />
            </div>
            <div className='pagination'>
            <Pagination
                showSizeChanger={false}
                pageSize={pageSize}
                onChange={onShowSizeChange}
                defaultCurrent={pageIndex}
                total={total}
            />
            </div>
        </>
    )
                    }else{
                        return <div className="spin-container">
                        <Spin />
                      </div>;
                    }
}
