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
            label: <Link to='hire-list'>Bài đăng tuyển dụng</Link>,
            icon: <ContainerOutlined />,
            key: 'hirelist'
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