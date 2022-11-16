import { Alert, Button, Input, message, Select, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

import { UserContext } from "../User/UserProvider";
import "../../styles/manager-page.css";
import { SearchOutlined } from "@ant-design/icons";
import { majorList, universityList } from "../../data/list";
import { serverURL } from "../../configs/server.config";
import { openNotificationWithIcon } from "../../common/service";

const { Option } = Select;

export const StudentList = () => {
  const { user, changeUser, token } = useContext(UserContext);
  const navigate = useNavigate();

  const [university, setUniversity] = useState(-1);
  const [major, setMajor] = useState(-1);
  const [search, setSearch] = useState("");
  const [listUser, setListUser] = useState([]);
  async function fetchListStudent() {
    let query = "?status=1";
    query = major !== -1 ? query + "&major=" + major : query;
    query = university !== -1 ? query + "&university=" + university : query;
    query = search !== "" ? query + "&search=" + search : query;
    const url = serverURL + "student" + query;
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
        console.log(result);
        setListUser([...result.data]);
      }
    } catch (err) {
      console.log(err);
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
        if (!result || result.role !== "company") {
          <Alert
            message="Warning"
            description="Bạn không có quyền xem trang này."
            type="warning"
            showIcon
            closable
          />;
          navigate("/home");
        }
        changeUser({ ...result });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //fetchCompany
  async function fetchCompany() {
    try {
      if (user) {
        const _id = user._id;
        const url = serverURL + "company/" + _id;
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
          if (result.data === "empty") {
            <Alert
              message="Warning"
              description="Bạn hãy cập nhật thông tin công ty để sử dụng chức năng này."
              type="warning"
              showIcon
              closable
            />;
            navigate("/company-profile");
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleViewCV = async (id_cv, id_company) => {
    const url = serverURL + "cv-view";
    const data = { id_cv, id_company };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      if (response.status !== 201 && response.status !== 200) {
        openNotificationWithIcon(
          "error",
          "Lỗi",
          "Lỗi thêm bản ghi lượt xem CV!"
        );
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    fetchCompany();
  }, [user]);
  useEffect(() => {
    fetchListStudent();
  }, [university, major, search]);

  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      fixed: "left",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Quê quán",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "CCCD",
      dataIndex: "cccd",
      key: "cccd",
    },
    {
      title: "Trường",
      dataIndex: "university",
      key: "university",
    },
    {
      title: "Khoa",
      dataIndex: "faculty",
      key: "faculty",
    },
    {
      title: "Chuyên ngành",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "Khóa học",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "GPA",
      dataIndex: "gpa",
      key: "gpa",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Link
          to={`../student/${record._id}`}
          onCLick={() => {
            handleViewCV(record._id, user._id);
          }}
        >
          Xem chi tiết
        </Link>
      ),
      fixed: "right",
    },
  ];

  const handleChangeUniversity = (e) => {
    setUniversity(e.value);
  };

  const handleChangeMajor = (e) => {
    setMajor(e.value);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="banner-content">Danh sách sinh viên</div>
      <div className="container-filter">
        <div className="filter">
          <label className="label-filter">Trường:</label>
          <Select
            value={university}
            defaultValue="all"
            labelInValue="Chuyên ngành"
            className="filter-content"
            onChange={handleChangeUniversity}
          >
            <Option value={-1}>all</Option>
            {universityList.map((university) => {
              return (
                <Option key={university} value={university}>
                  {university}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="filter">
          <label className="label-filter">Chuyên ngành:</label>
          <Select
            value={major}
            defaultValue="all"
            labelInValue="Chuyên ngành"
            className="filter-content"
            onChange={handleChangeMajor}
          >
            <Option value={-1}>all</Option>
            {majorList.map((major) => {
              return (
                <Option key={major} value={major}>
                  {major}
                </Option>
              );
            })}
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
        dataSource={listUser}
        columns={columns}
        scroll={{
          x: 800,
          y: 800,
        }}
      />
      ;
    </>
  );
};
