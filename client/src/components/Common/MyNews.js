import { Button, Input, message, Modal, Select, Table, Tag } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { DateToShortStringDate, openNotificationWithIcon, postFields } from "../../common/service";

const { Option } = Select;
export const MyNews = () => {
  const { user, changeUser, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState(-1);
  const [search, setSearch] = useState("");
  const [listNews, setListNews] = useState([]);
  const [fields, setFields] = useState([]);
  const [field, setField] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const [isOpenDelete, setOpenDelete] = useState(false);

  //fetch Fields
  async function fetchField() {
    const url = serverURL + "field";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      if (response.status !== 200) {
        message.error(result.message);
      } else {
        if (result.data === "empty") {
          const manuList = postFields();
          setFields(manuList);
        }
      setFields(result.data);
      }
    } catch (err) {
      console.log(err);
      message.error("Đã có lỗi xảy ra!");
    }
  }

  async function fetchListNews() {
    if(user){
        let query = "?id_account="+user._id;
        query = status !== -1 ? query + "&status=" + status : query;
        query = search !== "" ? query + "&search=" + search : query;
        query = field.length ? query + "&field=" + field : query;
        const url = serverURL + "news" + query;
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
            console.log("result", result);
            setListNews(result.data);
        }
        } catch (err) {
        console.log(err);
        }
    }
  }

  //fetch user
  const fetchUser = async () => {
    if(!user){
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
    }
  };

  const handleChangeField = (e) => {
    console.log(e);
    const value = e.map((item) => {
      return item.value;
    });
    setField([...value]);
  };

  const handleCancelDelete = ()=>{
    setOpenDelete(false);
  }

  const handleConfirmDelete = async ()=>{
    console.log('currentId', currentId);
    const url = serverURL + "news/" + currentId;
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
        openNotificationWithIcon('success', 'Thông báo', 'Bạn đã xóa bài đăng tin tức thành công')
        fetchListNews();
        setOpenDelete(false);
      }
    } catch (err) {
      console.log(err);
      message.error("Đã có lỗi xảy ra!");
    }
  }

  useEffect(() => {
    fetchUser();
  }, [user]);
  useEffect(() => {
    fetchField();
  }, []);
  useEffect(() => {
    fetchListNews();
  }, [status, search]);

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Số lượt xem",
      dataIndex: "views",
      key: "views",
    },
    {
        title: "Ngày đăng",
        key: "date",
        render: (_, record) => {
                return record.create_date ? (
                    <>{DateToShortStringDate(record.create_date)}</>
                  ) : (
                    ""
                  );
                },
      },
    {
      title: "Lĩnh vực",
      key: "fields",
      render: (_, record) => {
        return (
          <>
            {record.fields.map((manu) => {
              return (
                <Tag className="tag" color="cyan">
                  {manu.nameField}
                </Tag>
              );
            })}
          </>
        );
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
          <Tag icon={<MinusCircleOutlined />} color="default">
            chưa duyệt
          </Tag>
        ),
      fixed: "right",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button type="text" onClick={()=>handleDelete(record._id)}><DeleteTwoTone /></Button>
        // <Link to={`../admin/company/${record._id}`}></Link>
      ),
      fixed: "right",
    },
  ];

  const handleDelete =(id)=>{
    setCurrentId(id);
    setOpenDelete(true);
  }

  const handleChangeSelect = (e) => {
    setStatus(e.value);
  };
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="banner-content">Quản lý danh sách bài đăng tin tức của bạn</div>
      <div className="container-filter">
      <div className="filter">
          <label className="label-filter">Lĩnh vực bài đăng:</label>
          <Select
            mode="multiple"
            value={field}
            defaultValue="all"
            labelInValue="Lĩnh vực bài đăng"
            className="filter-content"
            onChange={handleChangeField}
          >
            <Option value={-1}>all</Option>
            {fields.map((field) => {
              return (
                <Option key={field._id} value={field._id}>
                  {field.nameField}
                </Option>
              );
            })}
          </Select>
        </div>
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
        dataSource={listNews}
        columns={columns}
        scroll={{
          x: 800,
          y: 800,
        }}
      />
      ;
      <Modal
        title="Xác nhận xóa"
        open={isOpenDelete}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>Bạn có chắc chắn muốn xóa!</p>
      </Modal> 
    </>
  );
};
