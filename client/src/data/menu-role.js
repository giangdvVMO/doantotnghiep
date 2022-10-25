import { AlertOutlined, BankOutlined, BookOutlined, ContactsOutlined, ContainerOutlined, CopyOutlined, HomeOutlined, SnippetsOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const MenuRole = {
    user: [{
        label: <Link to='home'>Trang chủ</Link>,
        icon: <HomeOutlined />,
        key: 'home'
    },
    {
        label: <Link to='about'>Về chúng tôi</Link>,
        icon: <AlertOutlined />,
        key: 'about'
    }],
    admin: [
        {
            label: <Link to='home'>Trang chủ</Link>,
            icon: <HomeOutlined />,
            key: 'home'
        },
        {
            label: <Link to='account-management'>Quản lý người dùng</Link>,
            icon: <UsergroupAddOutlined />,
            key: 'usermanagerment'
        },
        {
            label: <Link to='student-management'>Quản lý sinh viên</Link>,
            icon: <ContactsOutlined />,
            key: 'studentmanagerment'
        },
        {
            label: <Link to='company-management'>Quản lý doanh nghiệp</Link>,
            icon: <BankOutlined />,
            key: 'companymanagerment'
        },
        {
            label: <Link to='hire-management'>Quản lý bài đăng tuyển dụng</Link>,
            icon: <CopyOutlined />,
            key: 'hiremanagerment'
        },
        {
            label: <Link to='news-management'>Quản lý bài đăng tin tức</Link>,
            icon: <BookOutlined />,
            key: 'newsmanagerment'
        },
        {
            label: <Link to='about'>Về chúng tôi</Link>,
            icon: <AlertOutlined />,
            key: 'about'
        }
    ],
    company: [
        {
            label: <Link to='home'>Trang chủ</Link>,
            icon: <HomeOutlined />,
            key: 'home'
        },
        {
            label: <Link to='student-list'>Danh sách sinh viên</Link>,
            icon: <SnippetsOutlined />,
            key: 'studentlist'
        },
        {
            label: 'Quản lý bài đăng tuyển dụng',
            icon: <ContainerOutlined />,
            key: 'submenu',
            children: [
                { 
                    label: <Link to='recruit/add'>Thêm bài đăng tuyển dụng</Link>,
                    key: 'submenu-item-1' 
                },
                { 
                    label: <Link to='company/recruit-list'>Danh sách bài đăng tuyển dụng</Link>,
                    key: 'submenu-item-2' 
                },
            ],
        },
        {
            label: <Link to='news'>Tin tức</Link>,
            icon: <BookOutlined />,
            key: 'news'
        },
        {
            label: <Link to='about'>Về chúng tôi</Link>,
            icon: <AlertOutlined />,
            key: 'about'
        }
    ],
    student: [
        {
            label: <Link to='home'>Trang chủ</Link>,
            icon: <HomeOutlined />,
            key: 'home'
        },
        {
            label: <Link to='cv-student'>CV của tôi</Link>,
            icon: <SnippetsOutlined />,
            key: 'cvstudent'
        },
        {
            label: <Link to='company-list'>Danh sách doanh nghiệp</Link>,
            icon: <BankOutlined />,
            key: 'companylist'
        },
        {
            label: <Link to='recruit-list'>Bài đăng tuyển dụng</Link>,
            icon: <ContainerOutlined />,
            key: 'recruitlist'
        },
        {
            label: <Link to='news'>Tin tức</Link>,
            icon: <BookOutlined />,
            key: 'news'
        },
        {
            label: <Link to='about'>Về chúng tôi</Link>,
            icon: <AlertOutlined />,
            key: 'about'
        }
    ]
}