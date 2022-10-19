import { Button, Input, Pagination, Select, Table, Tag } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../User/UserProvider';
import '../../styles/manager-page.css'
import { CheckCircleOutlined, MinusCircleOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

export const StudentManager = () => {
    const { user } = useContext(UserContext);
    const [school, setSchool] = useState(-1);
    const [faculty, setFaculty] = useState(-1);
    const [majors, setMajors] = useState([]);
    const [major, setMajor] = useState(-1);
    const [status, setStatus] = useState(-1);
    const [search, setSearch] = useState('');
    const [current, setCurrent] = useState(2);
    const [totalPage, setTotal] = useState(10);
    useEffect(()=>{
      console.log('useEffect')
      const  majorList = ['tiếng nga', 'tiếng trung', 'tiếng nhật'];
      setMajors([...majorList]);
    },[])
    const listUser = [
        {
            key: '1',
            fullname: 32,
            birthday: '2022-12-12',
            address: '10 Downing Street',
            phone: '082937826',

            cccd:'12345',
            university: 'abc',
            faculty: 'toán học',
            major: 'toán học',
            course: '2012-2022',
            gpa: 2.9,
            card_student: '1234',
            status: 1
        },
        {
            key: '2',
            fullname: 32,
            birthday: '2022-12-12',
            address: '10 Downing Street',
            phone: '082937826',
            cccd:'12345',
            university: 'abc',
            faculty: 'toán học',
            major: 'toán học',
            course: '2012-2022',
            gpa: 2.9,
            card_student: '1234',
            status: 0
        },
    ];

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            fixed: 'left',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday',
        },
        {
            title: 'Quê quán',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'CCCD',
            dataIndex: 'cccd',
            key: 'cccd',
        },
        {
            title: 'Trường',
            dataIndex: 'university',
            key: 'university',
        },
        {
            title: 'Khoa',
            dataIndex: 'faculty',
            key: 'faculty',
        },
        {
            title: 'Chuyên ngành',
            dataIndex: 'major',
            key: 'major',
        },
        {
            title: 'Khóa học',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'GPA',
            dataIndex: 'gpa',
            key: 'gpa',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (_, record) => (
                     record.status?
                        <Tag icon={<CheckCircleOutlined />} 
                            color="success">
                            duyệt
                        </Tag>
                        :
                        <Tag icon={<MinusCircleOutlined />} color="default">
                            chưa duyệt
                        </Tag>
            ),
            fixed: 'right',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Link to={`../account/${record.key}`}>Xem chi tiết</Link>
            ),
            fixed: 'right',
        },
    ];

    const handleChangeMajor = (e)=>{
        setMajor(e.value);
    }

    const handleChangeSelect = (e)=>{
        setStatus(e.value);
    }

    const handleChangeSearch = (e)=>{
        setSearch(e.target.value);
    }

    const handleChangePage = (value)=>{
        setCurrent(value);
    }

    return (
        <>
            <div className='banner-content'>Quản lý danh sách sinh viên</div>
            <div className='container-filter'>
                <div className='filter'>
                    <label>Chuyên ngành:</label>
                    <Select
                        value={major}
                        defaultValue='all'
                        labelInValue='Chuyên ngành'
                        className='filter-content'
                        onChange={handleChangeMajor}
                    >
                        <Option value={-1}>all</Option>
                        {
                            majors.map((major)=>{
                                return (<Option key={major} value={major}>{major}</Option>)
                            })
                        }
                    </Select>
                </div>
                <div className='filter'>
                    <label>Trạng thái:</label>
                    <Select
                        value={status}
                        defaultValue='all'
                        labelInValue='Trạng thái'
                        className='filter-content'
                        onChange={handleChangeSelect}
                    >
                        <Option value={-1}>all</Option>
                        <Option value={1}>duyệt</Option>
                        <Option value={0}>chưa duyệt</Option>
                    </Select>
                </div>
                <div className='search'>
                    
                    <Input className='input' placeholder='Nhập thông tin cần tìm' value={search} onChange={handleChangeSearch}>
                    </Input>
                    <Button type="primary" icon={<SearchOutlined />}>
                        Tìm kiếm
                    </Button>
                </div>
            </div>
            <Table 
                dataSource={listUser} 
                columns={columns} 
                scroll={{
                    x: 800,
                    y: 800,
                }}
                pagination={false}
            />;
            <Pagination 
                pageSize= {1}
                current = {current}
                onChange= {handleChangePage}
                total={totalPage}
                />
        </>
    )
}
