import { Avatar, Dropdown, Image, Menu, message, Typography } from "antd";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {decodeToken , isExpired} from 'react-jwt';

import { UserContext } from "../User/UserProvider";
import '../../styles/account.css';
import { serverURL } from "../../configs/server.config";

const Account = () => {
    const { user, changeUser, token, changeToken } = useContext(UserContext)
    //fetch User
    // const fetchUser = async()=>{
    //     console.log('fetch user Account')
    //     const tokenx = token? token: window.localStorage.getItem('accessToken');
    //     const id = decodeToken(tokenx).sub;
    //     const url = serverURL + 'account/'+id;
    //         try {
    //             const response = await fetch(url, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             }
    //             );
    //             const result = await response.json();
    //             if(response.status!==200){
    //                 message.error("Lỗi hệ thống load user!");
    //             }else{
    //                 console.log('account', user);
    //                 changeUser({...result})
    //             }
    //         }
    //         catch (err) {
    //             console.log(err);
    //         }
    // }
    // useEffect(()=>{fetchUser()},[]);
    //

    let items = [
        {
            key: 1,
            label: (
                <Link to='/myaccount'>Thông tin tài khoản</Link>
            ),
        },
        {
            key: 3,
            label: (
                <Link to='/sign-in' onClick={()=>{window.localStorage.setItem('accessToken', '')}}>Đăng xuất</Link>
            ),
        },
    ];
    // eslint-disable-next-line default-case
    switch (user.role) {
        case 'student': items = items.concat([{
            key: 2,
            label: (
                <Link to='/student-profile'>Thông tin sinh viên</Link>
            ),
        }]);
        break;
        case 'company': items = items.concat([{
            key: 2,
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

    function compareFn(a, b) {
        if (a.key<b.key) {
          return -1;
        }
        if (a.key>b.key) {
          return 1;
        }
        // a must be equal to b
        return 0;
      }

    items = items.sort(compareFn);
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
                    <Typography className="account-name">{user.fullname === 'x' ? "Account" : user.fullname}</Typography>
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