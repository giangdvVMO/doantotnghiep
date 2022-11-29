import {
  Button,
  Input,
  message,
  Pagination,
  Select,
  Skeleton,
  Spin,
  Tooltip,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

import { UserContext } from "../User/UserProvider";
import "../../styles/manager-page.css";
import { QuestionCircleTwoTone, SearchOutlined } from "@ant-design/icons";
import { serverURL } from "../../configs/server.config";
import "../../styles/list.css";
import { postFields } from "../../common/service";
import { CardListCV } from "../Common/CardCV";

const { Option } = Select;
export const CVList = () => {
  const { user, changeUser, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const [field, setField] = useState([]);
  const [search, setSearch] = useState("");
  const [specialtity, setSpeciality] = useState('');
  const [experience, setExperience] = useState(-1)
  const [listCV, setListCV] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setPageTotal] = useState(1);

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

  async function fetchListCV() {
    let query = "?pageIndex=" + pageIndex + "&pageSize=" + pageSize;
    query = field.length&&!field.includes(-1) ? query + "&field=" + field : query;
    query = search !== "" ? query + "&search=" + search : query;
    query = specialtity!==""? query + "&specialtity" + specialtity : query;
    query = experience!==-1? query + "&experience" + experience : query;
    const url = serverURL + "CV" + query;
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
        setPageTotal(result.total);
        setListCV(result.data);
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
    fetchField();
  }, []);
  useEffect(() => {
    fetchListCV();
  }, [pageIndex, pageSize, field, experience, specialtity, search, user]);
  const handleChangeField = (e) => {
    console.log(e);
    const value = e.map((item) => {
      return item.value;
    });
    setField([...value]);
    setPageIndex(1);
  };

  const handleChangeSpeciality = (e) => {
    setSpeciality(e.target.value);
    setPageIndex(1);
  };
  
  const handleChangeExperience = (e) => {
    setExperience(e.value);
    setPageIndex(1);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    setPageIndex(1);
  };
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    setPageIndex(current);
  };
  if(fields&&user){
  return (
    <>
      <div className="banner-content"><h2>Danh sách CV</h2></div>
      <div className="container-filter">
        <div className="filter">
          <label className="label-filter">Lĩnh vực CV:</label>
          <Select
            mode="multiple"
            value={field}
            defaultValue={-1}
            labelInValue={true}
            className="filter-content"
            onChange={handleChangeField}
          >
            <Option value={-1}>Tất cả</Option>
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
          <label className="label-filter">Chuyên môn
              <Tooltip title="Các chuyên môn cách nhau dấu ,">
                <span style={{padding:'5px'}}><QuestionCircleTwoTone /></span>
              </Tooltip>
            :</label>
          <Input
              className="input search-input"
              placeholder="VD: C, C#"
              value={specialtity}
              onChange={handleChangeSpeciality}
            ></Input>
        </div>
        <div className="filter">
          <label className="label-filter">
            Kinh nghiệm:
              
          </label>
          <Select
              value={experience}
              defaultValue={-1}
              labelInValue={true}
              className="filter-content"
              onChange={handleChangeExperience}
            >
              <Option value={-1}>Tất cả</Option>
              <Option value={0}>Không yêu cầu</Option>
              <Option value={1}>Dưới 1 năm</Option>
              <Option value={2}>Từ 1 tới 5 năm</Option>
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
      
        <>
          <div className="list-container">
            <CardListCV listCV={listCV} id_company={user._id} />
          </div>
          <div className="pagination">
            <Pagination
              pageSize={pageSize}
              onChange={onShowSizeChange}
              defaultCurrent={pageIndex}
              total={total}
            />
          </div>
        </>
    </>
  );}else {
    return <div className="spin-container">
            <Spin size={200} />
          </div>;
}
};
