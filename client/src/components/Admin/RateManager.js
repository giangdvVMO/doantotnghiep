import { Button, Input, message, Select, Spin, Table, Tag } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

import { UserContext } from "../User/UserProvider";
import "../../styles/manager-page.css";
import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { serverURL } from "../../configs/server.config";

const { Option } = Select;
export const RateManagerAdmin = () => {
  const { user, changeUser, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState(-1);
  const [search, setSearch] = useState("");
  const [listRate, setListRate] = useState([]);

  async function fetchListRate() {
    if(user){
    let query = "?1=1";
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
        if (!result || result.role !== "admin") {
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
        <Tag color="#87d068">record.type_rate</Tag>:<Tag color="#2db7f5">record.type_rate</Tag>
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
      render: (_, record) => (
        <Link to={`../rate/${record._id}`}>
          Xem chi tiết
        </Link>
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
if(user){
  return (
    <>
      <div className="banner-content">Quản lý danh sách đánh giá</div>
      <div className="container-filter">
        {/* <div className='filter'>
                    <label className='label-filter'>Địa điểm:</label>
                    <Select
                    mode='multiple'
                        value={field}
                        defaultValue='all'
                        labelInValue='Địa điểm'
                        className='filter-content'
                        onChange={handleChangeField}
                    >
                        <Option value={-1}>all</Option>
                        {
                            fields.map((field)=>{
                                return (<Option key={field._id} value={field._id}>{field.nameField}</Option>)
                            })
                        }
                    </Select>
                </div> */}
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
