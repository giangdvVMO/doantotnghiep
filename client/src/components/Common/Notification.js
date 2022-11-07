import { useContext, useEffect, useState } from "react";
import { BellTwoTone } from '@ant-design/icons';
import { Badge, message, Avatar, List } from "antd";
import '../../styles/notification.css';
import { serverURL } from "../../configs/server.config";
import VirtualList from 'rc-virtual-list';
import { UserContext } from "../User/UserProvider";
import {decodeToken} from 'react-jwt';
import { useNavigate } from "react-router-dom";
const ContainerHeight = 200;

export const Notification = () => {
    const [count, setCount] = useState(10);
    const [noti, setNoti] = useState([]);
    const {user, token, changeUser} = useContext(UserContext);
    const [account, setAccount] = useState(user);
    const navigate = useNavigate();
    
    const fetchNoti = async()=>{
        if(account){
        const url = serverURL + 'noti/'+account._id;
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
                console.log("fetchField", result.data);
                setNoti(result.data);
            }
        }
        catch (err) {
            console.log(err);
            message.error("Đã có lỗi xảy ra!");
        }
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
                  if(!result){
                      message.warn('Bạn ko có quyền xem trang này');
                      navigate('/')
                  }
                    changeUser({...result})
                    setAccount({...result});
                }
            }
            catch (err) {
                console.log(err);
            }
    }
    useEffect(()=>{fetchUser()},[]);
    useEffect(()=>{fetchNoti()},[account]);
    // const onScroll = (e) => {
    //     if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
    //       appendData();
    //     }
    //   };
    return (
        <div className="notification">
            <Badge count={count} overflowCount={99}>
                <BellTwoTone className='icon-bell' />
            </Badge>
            {/* <List>
                <VirtualList
                    data={noti}
                    height={ContainerHeight}
                    itemHeight={47}
                    itemKey="email"
                    // onScroll={onScroll}
                >
                    {(item) => (
                    <List.Item key={item.email}>
                        <List.Item.Meta
                        avatar={<Avatar src={item.picture.large} />}
                        title={<a href="https://ant.design">{item.name.last}</a>}
                        description={item.email}
                        />
                        <div>Content</div>
                    </List.Item>
                    )}
                </VirtualList>
            </List> */}
        </div>
    )
}