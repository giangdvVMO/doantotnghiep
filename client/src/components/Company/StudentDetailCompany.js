import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Form,
  Image,
  message,
  Modal,
  Rate,
  Skeleton,
  Tag,
} from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { decodeToken } from "react-jwt";

import { UserContext } from "../User/UserProvider";
import "../../styles/form.css";
import "../../styles/my-account.css";
import {
  createNoti,
  DateToShortString,
  openNotificationWithIcon,
} from "../../common/service";
import { serverURL } from "../../configs/server.config";
import { Email } from "./Email";
import { RateModal } from "./Rate";
import { RateCommentList } from "../Common/RateCommentList";
import { domain } from "../../data/default-image";

let initstudent = {
  _id: -1,
  cccd: "",
  address: "",
  university: "",
  faculty: "",
  course: "",
  gpa: "",
  status: false,
  avatar: "",
  card_student: "",
  major: "",
  account: {
    avatar: ''
  }
};

export const StudentDetailCompany = () => {
  const { user, changeUser, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [account, setAccount] = useState(user);
  const [student, setStudent] = useState(initstudent);
  const [CV, setCV] = useState(null);
  const [isOpenConfirm, setOpenConfirm] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [rate, setRate] = useState(false);
  const [rateList, setRateList] = useState([]);
  const [isOpenRate, setOpenRate] = useState(false);
  const [isOpenEmail, setOpenEmail] = useState(false);

  const { id } = useParams();

  async function fetchStudent() {
    try {
      const url = serverURL + "student/admin/" + id;
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
        if (result.data === "empty") {
          message.warning("Không tồn tại sinh viên mã đã tìm!");
          navigate("/home");
        } else {
          console.log("result", result.data);
          setStudent(result.data);
        }
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
        setAccount({ ...result });
        changeUser({ ...result });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //FETCH CV
  async function fetchCV() {
    if (student && student._id !== -1) {
      const url = serverURL + "cv/" + student._id;
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
          if (!result.data.status) {
            openNotificationWithIcon(
              "warning",
              "Thông báo",
              "CV của sinh viên đã private vì đã được tuyển dụng hoặc vì một số lý do khác!"
            );
            setCV();
          } else {
            setCV({ ...result.data });
          }
        }
      } catch (err) {
        console.log(err);
        message.error("Đã có lỗi xảy ra!");
      }
    }
  }

  async function fetchApply() {
    if (account && student &&!rate) {
      const url =
        serverURL +
        `apply/condition?id_student=${student._id}&id_company=${account._id}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (response.status !== 200) {
          message.error(result.message);
        } else {
          if (result.data.length) {
            openNotificationWithIcon(
              "info",
              "Thông báo",
              "Sinh viên đã ứng tuyển công ty bạn, hãy gửi thư phỏng vấn nếu phù hợp!"
            );
          }
        }
      } catch (err) {
        console.log(err);
        message.error("Đã có lỗi xảy ra!");
      }
    }
  }

  async function fetchLetter() {
    if (account && student._id !== -1&&!rate) {
      const url =
        serverURL +
        `letter/condition?id_student=${student._id}&id_company=${account._id}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        console.log("result letter", result);
        if (response.status !== 200) {
          message.error(result.message);
        } else {
          if (result.data.length) {
            openNotificationWithIcon(
              "info",
              "Thông báo",
              "Bạn đã gửi thư mời phỏng vấn rồi!"
            );
            setDisabled(true);
          } else {
            setDisabled(false);
          }
        }
      } catch (err) {
        console.log(err);
        message.error("Đã có lỗi xảy ra!");
      }
    }
  }

  async function fetchConditionRate() {
    if (account && student._id !== -1) {
      const url =
        serverURL +
        `rate/precondition?id_student=${student._id}&id_company=${account._id}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        console.log("result letter", result);
        if (response.status !== 200) {
          message.error(result.message);
        } else {
          if (result.data===true) {
            openNotificationWithIcon(
              "info",
              "Thông báo",
              "Bạn có thể thực hiện đánh giá sinh viên!"
            );
            setRate(true);
          } else {
            setRate(false);
          }
        }
      } catch (err) {
        console.log(err);
        message.error("Đã có lỗi xảy ra!");
      }
    }
  }

  //fetch rateList
  async function fetchListRate() {
    if(user&&student._id!==-1){
    let query = `?type_rate=student&id_student=${student._id}&status=1`;
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
        setRateList(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    fetchStudent();
  }, []);
  useEffect(() => {
    fetchCV();
  }, [student]);
  useEffect(() => {
    fetchConditionRate();
  }, [student, account]);
  useEffect(() => {
    fetchLetter();
  }, [student, account]);
  useEffect(() => {
    fetchApply();
  }, [student, account]);
  useEffect(() => {
    fetchListRate();
  }, [student, account]);
  

  const ref = useRef();
  const refButtonSubmit = useRef();

  function handleKeyUp(e) {
    if (e.keyCode === 13) {
      console.log("enter");
      refButtonSubmit.current.focus();
      refButtonSubmit.current.click();
    }
  }
  const renderButtonGroup = () => {
    if (CV||rate){
      if(!rate){
      return (
        <div className="apply-container">
          <Button
            type="primary"
            className="apply-btn"
            disabled={disabled}
            onClick={handleApply}
          >
            Gửi thư mời phỏng vấn
          </Button>
        </div>
      );}
      return (
        <div className="apply-container">
          <Button
            type="primary"
            className="apply-btn"
            onClick={handleRate}
          >
            Thêm đánh giá
          </Button>
        </div>
      );
    }
    return "";
  };

  const handleRate = () => {
    setOpenRate(true);
  };

  const handleApply = () => {
    setOpenConfirm(true);
  };
  const handleCancelConfirm = () => {
    setOpenConfirm(false);
  };

  const handleChangeStatus = async()=>{
    const url = serverURL + 'cv/' + CV._id;
    const data = {
        status: false, update_id: account._id
    };
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        );
        const result = await response.json();
        console.log(result);
        if(response.status!==200){
            message.error("Không thành công!");
        }else{
            openNotificationWithIcon('success', 'Thông báo', 'Bạn đã đóng CV của sinh viên về trạng thái private!')
        //send noti
        const link = "student/company/" + student._id;
        const title = "Thay đổi trạng thái CV";
        const type = "infor";
        const content = `Doanh nghiệp vừa đóng trạng thái CV của bạn.`;
        createNoti(account._id, [student._id], title, type, content, link);
        //
        fetchCV();
      }
    }
    catch (err) {
        console.log(err);
    }
  }

  const handleOkConfirm = () => {
    //gửi mail và noti
    setOpenConfirm(false);
    setOpenEmail(true);
  };
  if (account&&student._id!==-1) {
    return (
      <div className="swapper-container">
        <div className="introduce-frame">
          <div className="background-image"></div>
          <div className="introduce-bottom">
          <div className='avatar-container'>
            {
              student.account.avatar?
              <Avatar className="avatar" size={120} src={domain+student.account.avatar} />
              :
              <Avatar className="avatar" size={120} icon={<UserOutlined />} />
            }
          </div>

            <div className="introduce-fullname">{student.account.fullname}</div>
            
            {renderButtonGroup()}
          </div>
        </div>
        <div className="detail-swapper">
          <p className="title-account">Thông tin sinh viên</p>
          <div className="underline"></div>
          <div className="body">
            <Form
              ref={ref}
              onKeyUp={handleKeyUp}
              className="form"
              name="basic"
              layout="vertical"
              autoComplete="off"
            >
              <div className="two-colums">
                <Form.Item
                  label="Họ và tên"
                  name="fullname"
                  initialValue={account.fullname}
                  className="label"
                >
                  <p className="text-display">{account.fullname}</p>
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  initialValue={account.email}
                  className="label"
                >
                  <p className="text-display">{account.email}</p>
                </Form.Item>

                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  initialValue={account.phone}
                  className="label"
                >
                  <p className="text-display">{account.phone}</p>
                </Form.Item>
                <Form.Item
                  label="Trường"
                  name="university"
                  initialValue={student.university}
                  className="label"
                >
                  <p className="text-display">{student.university}</p>
                </Form.Item>
                <Form.Item
                  label="Khoa"
                  name="faculty"
                  initialValue={student.faculty}
                  className="label"
                >
                  <p className="text-display">{student.university}</p>
                </Form.Item>
                <Form.Item
                  label="Chuyên ngành"
                  name="major"
                  className="label"
                  initialValue={student.major}
                >
                  <p className="text-display">{student.major}</p>
                </Form.Item>
                <Form.Item
                  label="Khóa học"
                  name="course"
                  initialValue={student.course}
                  className="label"
                >
                  <p className="text-display">{student.course}</p>
                </Form.Item>
                <Form.Item
                  label="CCCD"
                  name="cccd"
                  initialValue={student.cccd}
                  className="label"
                >
                  <p className="text-display">{student.cccd}</p>
                </Form.Item>
                <Form.Item
                  label="Quê quán"
                  name="address"
                  initialValue={student.address}
                  className="label"
                >
                  <p className="text-display">{student.address}</p>
                </Form.Item>
                <Form.Item
                  label="Mã sinh viên"
                  name="card_student"
                  initialValue={student.card_student}
                  className="label"
                >
                  <p className="text-display">{student.card_student}</p>
                </Form.Item>
                <Form.Item label="Ngày sinh" name="birthday" className="label">
                  <p className="text-display">
                    {DateToShortString(account.birthday)}
                  </p>
                </Form.Item>
                <Form.Item
                  label="GPA"
                  name="gpa"
                  initialValue={student.gpa}
                  className="label"
                >
                  <p className="text-display">{student.gpa}</p>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
        <Card title="Thông tin CV">
          {CV ? (
            <Form
              ref={ref}
              onKeyUp={handleKeyUp}
              className="form"
              name="basic"
              layout="vertical"
            >
              <div className="two-colums">
                <Form.Item label="Tiêu đề CV:" name="title" className="label">
                  <p className="text-display">{CV.title}</p>
                </Form.Item>
                <Form.Item label="Lĩnh vực:" name="fields" className="label">
                  {
                    <div>
                      {CV.fields.length ? (
                        CV.fields.map((field) => {
                          return (
                            <Tag className="tag" color="cyan">
                              {field.nameField}
                            </Tag>
                          );
                        })
                      ) : (
                        <p className="text-display"></p>
                      )}
                    </div>
                  }
                </Form.Item>
                <Form.Item label="FILE CV:" className="label">
                  {CV.file_cv ? (
                    <Image alt="file_cv" src={CV.file_cv} width={300} />
                  ) : (
                    <p>Chưa có ảnh</p>
                  )}
                </Form.Item>
                <Form.Item>

                </Form.Item>
                {rate?
                  <Form.Item label="Bạn đã tuyển sinh viên này, bạn có thể đổi trạng thái CV thành private!" className="label">
                    <Button type="primary" onClick={async()=>{await handleChangeStatus()}}>Đổi trạng thái</Button>
                  </Form.Item>:''
                }
              </div>
            </Form>
          ) : (
            <p>Chưa có CV hoặc CV ở trạng thái private</p>
          )}
        </Card>
        <Card title="Các đánh giá sinh viên">
            {rateList?<RateCommentList list={rateList}/>:<div>Chưa có đánh giá nào</div>}
        </Card>

          {/* xác nhận */}
        <Modal
          closable={true}
          title="Xác nhận"
          open={isOpenConfirm}
          okText='Xác nhận'
          cancelText='Hủy'
          onOk={handleOkConfirm}
          onCancel={handleCancelConfirm}
        >
          <p>Bạn có chắc chắn muốn gửi thư mời phỏng vấn sinh viên này!</p>
        </Modal>
        {/* soạn thư */}
        <Modal
          title="Thông tin thư mời phỏng vấn"
          open={isOpenEmail}
          footer={null}
          destroyOnClose={()=>{setOpenEmail(false)}}
        >
          <Email id_student={student._id} id_company={account._id} setOpenEmail={setOpenEmail} setRate={setRate}/>
        </Modal>

      {/* đánh giá */}
        <Modal
          title="Thông tin đánh giá"
          open={isOpenRate}
          footer={null}
          destroyOnClose={()=>{setOpenRate(false)}}
        >
          <RateModal id_student={student._id} id_company={account._id} type_rate={'student'} setOpenRate={setOpenRate}/>
        </Modal>
      </div>
    );
  } else {
    return <Skeleton active />;
  }
};
