import { Button, Input, message, Modal, Select, Spin, Table, Tag } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

import { UserContext } from "../User/UserProvider";
import "../../styles/manager-page.css";
import {
  CheckCircleOutlined,
  DeleteTwoTone,
  MinusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { serverURL } from "../../configs/server.config";
import { createNoti, openNotificationWithIcon } from "../../common/service";

const { Option } = Select;
export const RateListStudent = () => {
  const { user, changeUser, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState(-1);
  const [search, setSearch] = useState("");
  const [listRate, setListRate] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const [isOpenDelete, setOpenDelete] = useState(false);
  
  async function fetchListRate() {
    if(user){
    let query = `?type_rate=company&id_student=${user._id}`;
    query = status !== -1 ? query + "&status=" + status : query;
    query = search !== "" ? query + "&search=" + search : query;
    const url = serverURL + "rate" + query;
    console.log(query);
    try {
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
        setListRate(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
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
          message.warn("Bạn ko có quyền xem trang này");
          navigate("/");
        }
        changeUser({ ...result });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    fetchListRate();
  }, [user, status, search]);
  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      fixed: "left",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Nội dung đánh giá",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Sinh viên",
      key: "fullname",
      render: (_, record) => {
        return <div>{record.account.fullname}</div>
      },
    },
    {
        title: "Doanh nghiệp",
        key: "company",
        render: (_, record) => {
          return <div>{record.company.com_name}</div>
        },
      },
    {
      title: "Loại đánh giá",
      key: "type",
      render: (_, record) => {
        return (record.type_rate==='student'?
        <Tag color="#87d068">{record.type_rate}</Tag>:<Tag color="#2db7f5">{record.type_rate}</Tag>
        )
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) =>
        record.status ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            duyệt
          </Tag>
        ) : (
          <Tag icon={<MinusCircleOutlined />} color="warning">
            chưa duyệt
          </Tag>
        ),
      fixed: "right",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (<>
       <Button type="text" onClick={()=>handleDelete(record._id)}><DeleteTwoTone /></Button>
        </>
      ),
      fixed: "right",
    },
  ];

  const handleChangeSelect = (e) => {
    setStatus(e.value);
  };
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete =(id)=>{
    setCurrentId(id);
    setOpenDelete(true);
  }
  const handleConfirmDelete = async ()=>{
    console.log('currentId', currentId);
    const url = serverURL + "rate/" + currentId;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      if (response.status !== 200) {
        message.error(result.message);
      } else {
        openNotificationWithIcon('success', 'Thông báo', 'Bạn đã xóa đánh giá thành công')
        fetchListRate();
        setOpenDelete(false);
      }
    } catch (err) {
      console.log(err);
      message.error("Đã có lỗi xảy ra!");
    }
  }
  const handleCancelDelete = ()=>{
    setOpenDelete(false);
  }
 
if(user){
  return (
    <>
      <div className="banner-content">Danh sách đánh giá</div>
      <div className="container-filter">
        <div className="filter">
          <label className="label-filter">Trạng thái:</label>
          <Select
            value={status}
            defaultValue="all"
            labelInValue="Trạng thái"
            className="filter-content"
            onChange={handleChangeSelect}
          >
            <Option value={-1}>all</Option>
            <Option value={1}>duyệt</Option>
            <Option value={0}>chưa duyệt</Option>
          </Select>
        </div>
        <div className="filter">
          <label className="transparent">Tìm kiếm</label>
          <div className="search">
            <Input
              className="input search-input"
              placeholder="Nhập thông tin cần tìm"
              value={search}
              onChange={handleChangeSearch}
            ></Input>
            <Button type="primary" icon={<SearchOutlined />}>
              Tìm kiếm
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title="Xác nhận xóa"
        open={isOpenDelete}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>Bạn có chắc chắn muốn xóa!</p>
      </Modal> 
                
      <Table
        dataSource={listRate}
        columns={columns}
        scroll={{
          x: 1000,
          y: 800,
        }}
      />
      ;
    </>
  );}else{
    return <div className="spin-container">
    <Spin />
  </div>;
}
};
