import React, { useContext, useEffect, useState } from 'react';
import { message, Segmented, Spin, Table } from 'antd';
import { serverURL } from '../../configs/server.config';
import { UserContext } from '../User/UserProvider';
import { decodeToken } from "react-jwt";
import { Link, useNavigate } from 'react-router-dom';
import { openNotificationWithIcon } from '../../common/service';
import '../../styles/statistic.css'
import { ChartCV } from './ChartCV';


export const Statistic = () => {
    const {user, changeUser, token} = useContext(UserContext); 
  const [value, setValue] = useState('CV');
  const [CV, setCV] = useState();
  const navigate = useNavigate();

  //fetch user
  const fetchUser = async () => {
    console.log("fetch user account");
    const tokenx = token ? token : window.localStorage.getItem("accessToken");
    console.log("tokenx", tokenx);
    const id = decodeToken(tokenx).sub;
    console.log("id", id);
    const url = serverURL + "account/" + id;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (response.status !== 200) {
        message.error("Lỗi hệ thống load user!");
      } else {
        console.log("user fetch to set role", result);
        if (!result || result.role !== "student") {
            openNotificationWithIcon('warning', 'Cảnh báo', 'Bạn ko có quyền xem trang này')
          navigate("/");
        }
        changeUser({ ...result });
      }
    } catch (err) {
      console.log(err);
    }
  };
  //FETCHCV
  async function fetchCV() {
    if(user){
    console.log("fetchCV");
    const url = serverURL + "cv-view/list/" + user._id;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log("CV", result);
      if (response.status !== 200) {
        message.error(result.message);
      } else {
        setCV({...result.data });
      }
    } catch (err) {
      console.log(err);
      message.error("Đã có lỗi xảy ra!");
    }
}
  }
  useEffect(()=>{fetchUser()},[])
  useEffect(()=>{fetchCV()},[value, user]);
  const columns = [
    {
      title: "Tên công ty",
      key: "com_name",
      render: (_, record) => (
        <p>{record.company.com_name}</p>
      ),
    },
    {
      title: "Địa chỉ",
      key: "address",
      render: (_, record) => (
        <p>{record.company.address}</p>
      ),
    },
    {
      title: "Số lượt xem",
      dataIndex: "views",
      key: "views",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Link to={`../company/${record.company._id}`}>Xem chi tiết</Link>
      ),
      fixed: "right",
    },
  ];
  return (
    <>
    <div className='segment'>
      <Segmented className='segment-content' block options={['CV', 'Apply', 'Thư mời']} value={value} onChange={setValue} />
    </div>
        {
        value==='CV'&&CV?
            
        <div className='statistic_container'>
            <div className='view-count_container'>
                <h1>Số lượt xem</h1>
                <p>{CV.count}</p>
            </div>
            <div className='container-image'>
            <div className='chart'>
              <ChartCV CV={CV}/>
            </div>
            <div className='table-statistic'>
              <Table
              pagination={false}
                dataSource={CV.views}
                columns={columns}
                scroll={{
                  x: 400,
                  y: 400,
                }}
              />
            </div>
            </div>
        </div>
        :
        value==='Apply'?
            'Apply'
        :
        value==='Thư mời'?
        'Thư mời'
        :
        <div className="spin-container">
            <Spin size={200} />
        </div>
        }
    </>
  )
};