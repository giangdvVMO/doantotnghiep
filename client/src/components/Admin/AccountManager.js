import { Button, Input, Select, Space, Table, Tag } from 'antd';
import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../User/UserProvider';
import '../../styles/manager-page.css'
import { CheckCircleOutlined, MinusCircleOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

export const AccountManager = () => {
    const { user } = useContext(UserContext);
    const [status, setStatus] = useState(-1);
    const [search, setSearch] = useState('');
    const listUser = [
        {
            key: '1',
            username: 'Mike',
            fullname: 32,
            birthday: '2022-12-12',
            address: '10 Downing Street',
            role: 'sinh viên',
            phone: '082937826',
            status: 1
        },
        {
            key: '2',
            username: 'Mike',
            fullname: 32,
            birthday: '2022-12-12',
            address: '10 Downing Street',
            role: 'sinh viên',
            phone: '082937826',
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
            title: 'Tên đăng nhập',
            dataIndex: 'username',
            key: 'username',
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
            title: 'Vị trí',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (_, record) => (
                     record.status?
                        <Tag icon={<CheckCircleOutlined />} 
                            color="success">
                            active
                        </Tag>
                        :
                        <Tag icon={<MinusCircleOutlined />} color="default">
                            inactive
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

    const handleChangeSelect = (value)=>{
        setStatus(value);
    }

    const handleChangeSearch = (e)=>{
        setSearch(e.target.value);
    }

    return (
        <>
            <div className='banner-content'>Quản lý danh sách sinh viên</div>
            <div className='container-filter'>
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
                        <Option value={1}>active</Option>
                        <Option value={0}>inactive</Option>
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
            />;
        </>
    )
}
