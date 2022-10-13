import { Avatar, Dropdown, Image, Menu, Typography } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../User/UserProvider";
import '../../styles/account.css';

const Account = () => {
    const { user } = useContext(UserContext)
    console.log(user);
    const items = [
        {
            key: '1',
            label: (
                <Link to='/profiles'>Thông tin cá nhân</Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to='/account'>Thông tin tài khoản</Link>
            ),
        },
        {
            key: '4',
            label: (
                <Link to='/signIn'>Đăng xuất</Link>
            ),
        },
    ];
    // eslint-disable-next-line default-case
    switch (user.role) {
        case 'student': items.concat([{
            key: '3',
            label: (
                <Link to='/student-profile'>Thông tin sinh viên</Link>
            ),
        }]);
        break;
        case 'company': items.concat([{
            key: '3',
            label: (
                <Link to='/company-profile'>Thông tin doanh nghiệp</Link>
            ),
        }]);
        break;
    }
    const detailAccount = (
        <Menu className="menu-account"
            items={items}
        />
    )
    return (
        <>
            <Dropdown
                className="account-container"
                overlay={detailAccount}
                placement="bottom"
                arrow={{
                    pointAtCenter: true,
                }}
            >
                <div className="account-avatar-container">
                    <Typography className="account-name">{user.name === 'x' ? "Account" : user.name}</Typography>
                    {
                        user.avatar ?
                            <Avatar
                                src={
                                    <Image
                                        src="https://joeschmoe.io/api/v1/random"
                                        style={{
                                            width: 32,
                                        }}
                                    />
                                }
                            /> :
                            <Avatar
                                className="account-avatar"
                            >
                                U
                            </Avatar>
                    }
                </div>
            </Dropdown>
        </>
    )
}

export default Account;