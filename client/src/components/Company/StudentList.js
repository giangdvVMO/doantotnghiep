import { Alert, Button, Image, Input, message, Select, Table } from "antd";
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
   // console.log(query);
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
       // console.log(result);
        setListUser([...result.data]);
      }
    } catch (err) {
     // console.log(err);
    }
  }
  //fetch user
  const fetchUser = async () => {
   // console.log("fetch user account");
    const tokenx = token ? token : window.localStorage.getItem("accessToken");
   // console.log("tokenx", tokenx);
    const id = decodeToken(tokenx).sub;
   // console.log("id", id);
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
       // console.log("user fetch to set role", result);
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
     // console.log(err);
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
         // console.log("result", result);
          if (result.data === "empty") {
            openNotificationWithIcon('warning', 'Cảnh báo', 'Bạn hãy cập nhật thông tin công ty để sử dụng chức năng này.')
            navigate("/company-profile");
          }else{
            if(result.data.status === false){
              openNotificationWithIcon('warning', 'Cảnh báo', 'Thông tin của bạn chưa được duyệt nhé!')
              navigate("/home");
              return;
          }
          }
        }
      }
    } catch (err) {
     // console.log(err);
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
     // console.log(result);
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
  useEffect(() => {fetchCompany();
  }, [user]);
  useEffect(() => {
    fetchListStudent();
  }, [university, major, search]);

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      width: 200,
      key: "fullname",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      width: 120,
      key: "birthday",
    },
    {
      title: "Quê quán",
      dataIndex: "address",
      width: 150,
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 120,
      key: "phone",
    },
    {
      title: "CCCD",
      dataIndex: "cccd",
      width: 200,
      key: "cccd",
    },
    {
      title: "Trường",
      dataIndex: "university",
      width: 150,
      key: "university",
    },
    {
      title: "Khoa",
      dataIndex: "faculty",
      width: 150,
      key: "faculty",
    },
    {
      title: "Chuyên ngành",
      dataIndex: "major",
      width: 150,
      key: "major",
    },
    {
      title: "Khóa học",
      dataIndex: "course",
      width: 150,
      key: "course",
    },
    {
      title: "GPA",
      dataIndex: "gpa",
      width: 100,
      key: "gpa",
    },
    {
      title: "Hành động",
      key: "action",
      width: 150,
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
      <div className="banner-content">
        <div className="text-banner">Danh sách sinh viên</div>
        <Image className="image-background-banner" src="https://i.ibb.co/gr1SLQp/Coding-workshop-amico.png" preview={false}/>
      </div>
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
    </>
  );
};
