import {
    Avatar,
    Button,
    Card,
    Form,
    Image,
    Input,
    message,
    Select,
    Spin,
    Tag,
    Upload,
  } from "antd";
  import { useContext, useEffect, useRef, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { decodeToken } from "react-jwt";
  
  import { serverURL } from "../../configs/server.config";
  import { UserContext } from "../User/UserProvider";
  import "../../styles/form.css";
  import "../../styles/my-account.css";
  import '../../styles/cv.css'
  import { checkString, checkArray, checkFileCV, checkNumber } from "../../common/validation";
  import {
    DateToShortString,
    openNotificationWithIcon,
  } from "../../common/service";
  import {
    CheckCircleOutlined,
    MailOutlined,
    MinusCircleOutlined,
    PhoneOutlined,
    PlusOutlined,
  } from "@ant-design/icons";
  import { messageCVError } from "../../common/error";
    import { avatarImage, domain } from "../../data/default-image";
import TextArea from "antd/lib/input/TextArea";
  const { Option } = Select;
  
  let initialStudent = {
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
  };
  
  let initialCV = {
    _id: -1,
    title: '',
    summary: '',
    speciality: '',
    certificate: '',
    experience: '',
    fields: [],
    file_cv: "",
    status: false,
  };
  
  export const MyCVChange = () => {
    const { user, changeUser, token } = useContext(UserContext);
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    const [account, setAccount] = useState(user);
    const [student, setStudent] = useState(initialStudent);
    const [CV, setCV] = useState(initialCV);
    const [fields, setFields] = useState([]);
    const [file, setFile] = useState('');
    const defaultTrueStatus = {
      status: "success",
      errorMsg: null,
    };
  
    async function fetchStudent() {
      if (account) {
        try {
          const _id = account._id;
          const url = serverURL + "student/" + _id;
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          if (response.status !== 200) {
            console.log("Lỗi hệ thống!");
            message.error("Lỗi hệ thống!");
          } else {
            console.log("result", result);
            if (result.data === "empty") {
              openNotificationWithIcon('warning', 'Cảnh báo', 'Bạn phải cập nhật thông tin sinh viên!')
              navigate("/student-profile");
            } else {
              console.log("fetch Student", result.data);
              setStudent({ ...student, ...result.data });
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
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
          message.success("Load field thành công!");
          setFields(result.data);
        }
      } catch (err) {
        console.log(err);
        message.error("Đã có lỗi xảy ra!");
      }
    }
    
    async function fetchCV() {
      console.log("fetchCV");
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
          setCV({ ...initialCV, ...result.data });
        }
      } catch (err) {
        console.log(err);
        message.error("Đã có lỗi xảy ra!");
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
          setAccount({ ...result });
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
      fetchStudent();
    }, [account]);
    useEffect(() => {
      fetchField();
    }, []);
    useEffect(() => {
      fetchCV();
    }, [student]);
  
    //initial Validate
    const [validateTitle, setValidateTitle] = useState(defaultTrueStatus);
    const [validateFileCV, setValidateFileCV] = useState(defaultTrueStatus);
    const [validateFields, setValidateFields] = useState(defaultTrueStatus);
    const [validateExperience, setValidateExperience] = useState(defaultTrueStatus);
    const ref = useRef();
    const refButtonSubmit = useRef();
  
    //handle change
    //validate
    function checkTitleFunc(title) {
      if (!checkString(title)) {
        setValidateTitle({
          status: "error",
          errorMsg: messageCVError.title,
        });
        return false;
      } else {
        setValidateTitle(defaultTrueStatus);
        return true;
      }
    }

    function checkExperienceFunc(title) {
        if (!checkNumber(title)) {
          setValidateTitle({
            status: "error",
            errorMsg: messageCVError.experience,
          });
          return false;
        } else {
          setValidateTitle(defaultTrueStatus);
          return true;
        }
      }
  
    function checkFileFunc(data) {
      if (!checkFileCV(data)) {
        setValidateFileCV({
          status: "error",
          errorMsg: messageCVError.fileCV,
        });
        return false;
      } else {
        setValidateFileCV(defaultTrueStatus);
        return true;
      }
    }

    function checkFileFunc(data) {
      if (!checkFileCV(data)) {
        setValidateFileCV({
          status: "error",
          errorMsg: messageCVError.fileCV,
        });
        return false;
      } else {
        setValidateFileCV(defaultTrueStatus);
        return true;
      }
    }
  
    function checkFieldFunc(fields) {
      console.log("fields", fields);
      if (!checkArray(fields)) {
        setValidateFields({
          status: "error",
          errorMsg: messageCVError.field,
        });
        return false;
      } else {
        setValidateFields(defaultTrueStatus);
        return true;
      }
    }
    //handle action
    async function createCV() {
      const url = serverURL + "cv";
      let formData = new FormData();
      formData.append('id_student',student._id);
      formData.append('fields',CV.fields);
      formData.append('file_cv',file);
      formData.append('title',CV.title);
      formData.append('status',CV.status);
      formData.append('certificate',CV.certificate);
      formData.append('speciality',CV.speciality);
      formData.append('experience',CV.experience);
      formData.append('summary',CV.summary);
      console.log("request", formData);
      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData,
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        });
        const result = await response.json();
        console.log(result);
        if (response.status !== 201) {
          openNotificationWithIcon('error','Thông báo', 'Lỗi')
          message.error(result.message);
        } else {
          openNotificationWithIcon(
            "success",
            "Thông báo",
            "Bạn đã tạo CV thành công!"
          );
          fetchCV();
          setIsEdit(false);
        }
      } catch (err) {
        console.log(err);
        message.error("Đã có lỗi xảy ra!");
      }
    }
  
    async function updateCV() {
      const url = serverURL + "cv/" + CV._id;
      let formData = new FormData();
      formData.append('fields',+CV.fields[0]?CV.fields:CV.fields.map(item=>item._id));
      console.log("file", file)
      if(file){formData.append('file_cv',file)};
      formData.append('title',CV.title);
      formData.append('status',CV.status);
      formData.append('update_id',student._id);
      formData.append('certificate',CV.certificate);
      formData.append('speciality',CV.speciality);
      formData.append('experience',CV.experience);
      formData.append('summary',CV.summary);
      // const data = { ...CV, update_id:  };
      console.log("request", formData);
      try {
        const response = await fetch(url, {
          method: "PATCH",
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
          body: formData,
        });
        const result = await response.json();
        console.log(result);
        if (response.status !== 200) {
          message.error(result.message);
        } else {
          openNotificationWithIcon(
            "success",
            "Thông báo",
            "Bạn đã cập nhật CV thành công!"
          );
          fetchCV();
          setIsEdit(false);
          // fetchCompany();
        }
      } catch (err) {
        console.log(err);
        message.error("Đã có lỗi xảy ra!");
      }
    }
  
    async function handleSave(e) {
      ref.current.submit();
      let count = 0;
      console.log("account", account);
      console.log("student", student);
      count = checkTitleFunc(CV.title) ? count : count + 1;
      count = file? count: count+1;
      count = CV.certificate?count: count+1;
      count = CV.speciality?count: count+1;
      count = CV.experience?count: count+1;
      count = CV.summary?count: count+1;
      // count = checkFileFunc(CV.file_cv) ? count : count + 1;
      count = checkFieldFunc(CV.fields) ? count : count + 1;
      console.log("count", count);
      console.log(CV);
      if (count === 0) {
        if (CV._id === -1) {
          createCV();
        } else {
          updateCV();
        }
      }
      return;
    }
  
    async function handleEdit(e) {
      await fetchCV();
      setIsEdit(true);
      console.log("edit", CV);
      // return;
    }
    async function handleCancel(e) {
      setIsEdit(false);
      fetchCV();
      return;
    }
    const renderButtonGroup = () => {
      if (!isEdit) {
        return (
          <>
            <Button
              type="submit"
              className="button edit-btn"
              onClick={handleEdit}
            >
              {CV._id === -1 ? "Tạo" : "Sửa"}
            </Button>
          </>
        );
      } else {
        return (
          <>
            <Button
              type="submit"
              className="button save-btn"
              onClick={handleSave}
            >
              Lưu
            </Button>
            <Button
              type="reset"
              className="button cancel-btn"
              onClick={handleCancel}
            >
              Hủy
            </Button>
          </>
        );
      }
    };
    const renderStatus = () => {
      if (CV.status) {
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            public
          </Tag>
        );
      } else {
        return (
          <Tag icon={<MinusCircleOutlined />} color="default">
            private
          </Tag>
        );
      }
    };
    function handleChangeTitle(e) {
      setCV((preCV) => {
        return { ...preCV, title: e.target.value };
      });
    }
  
    function handleChangeFields(value) {
      console.log("value", value);
      setCV((preCV) => {
        return { ...preCV, fields: value };
      });
    }
  
    function handleChangeStatus(value) {
      setCV((preCV) => {
        return { ...preCV, status: value };
      });
    }

    function handleChangeSummary(e) {
        setCV((preCV) => {
          return { ...preCV, summary: e.target.value };
        });
    }

    function handleChangeCertificate(e) {
        setCV((preCV) => {
          return { ...preCV, certificate: e.target.value };
        });
      }

      function handleChangeSpeciality(e) {
        setCV((preCV) => {
          return { ...preCV, speciality: e.target.value };
        });
      }
      function handleChangeExperience(e) {
        setCV((preCV) => {
          return { ...preCV, experience: e.target.value };
        });
      }
    // const getBase64 = (img, callback) => {
    //   const reader = new FileReader();
    //   reader.addEventListener("load", () => callback(reader.result));
    //   reader.readAsDataURL(img);
    // };
    // const beforeUpload = (file) => {
    //   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    //   if (!isJpgOrPng) {
    //     message.error("You can only upload JPG/PNG file!");
    //   }
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!isLt2M) {
    //     message.error("Image must smaller than 2MB!");
    //   }
    //   return isJpgOrPng && isLt2M;
    // };
    const handleChange = (info) => {
      console.log("info", info.target.files[0]);
      setFile(info.target.files[0]);
      console.log(CV);
    };
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </div>
    );
    if (account && student&& fields) {
      //render UI
      return (
        <>
        <div className="CV-container">
            <div className="left-CV-container">
                <Avatar shape='square' className='cv-detail-avatar' src={account.avatar?domain+account.avatar:avatarImage}/>
                <div className="cv-fullname">{account.fullname}</div>
                <br/>
                
                <div className="title-in-cv">Thông tin cá nhân</div>
                <div className="detail-section-cv-container">
                    <div className="part-section-cv">
                        <span className="left-content-cv">CCCD:</span><span>{student.cccd}</span>
                    </div>
                </div>
                <br/>
                <div className="title-in-cv">Liên hệ</div>
                <div className="detail-section-cv-container">
                    <div className="part-section-cv">
                        <span className="left-content-cv"><PhoneOutlined /></span><span>{account.address}</span>
                    </div>
                    <div className="part-section-cv">
                        <span className="left-content-cv"><PhoneOutlined /></span><span>{account.phone}</span>
                        </div>
                    <div className="part-section-cv">
                        <span className="left-content-cv"><MailOutlined /></span><span>{account.email}</span>
                    </div>
                </div>
                <br/>
                <div className="title-in-cv">Học vấn</div>
                <div className="detail-section-cv-container">
                    <div className="part-section-cv">
                        <span className="left-content-cv">Trường:</span><span>{student.university}</span>
                    </div>
                    <div className="part-section-cv">
                        <span className="left-content-cv">Khoa:</span><span>{student.faculty}</span>
                        </div>
                    <div className="part-section-cv">
                        <span className="left-content-cv">Chuyên ngành:</span><span>{student.major}</span>
                    </div>
                    <div className="part-section-cv">
                        <span className="left-content-cv">Khóa học:</span><span>{student.course}</span>
                    </div>
                    <div className="part-section-cv">
                        <span className="left-content-cv">GPA:</span><span>{student.gpa}</span>
                    </div>
                </div>
            </div>
            <div className="right-CV-container">
                <div className="cv-fullname">Thông tin CV</div>
            <Form
                  ref={ref}
                  // onKeyUp={handleKeyUp}
                  className="form"
                  name="basic"
                  layout="vertical"
                >
                        {isEdit ? <>
                            <Form.Item
                                label="Tiêu đề:"
                                name="title"
                                validateStatus={validateTitle.status}
                                help={validateTitle.errorMsg}
                                className="label-cv"
                                required
                            >
                                <Input
                                    className="max-width"
                                    placeholder="Nhập tiêu đề CV"
                                    defaultValue={CV.title}
                                    value={CV.title}
                                    onChange={handleChangeTitle}
                                />
                            </Form.Item>
                                <Form.Item
                                    label="Tổng quan:"
                                    name="summary"
                                    className="label-cv"
                                    required
                                >
                                            <TextArea rows={5} value={CV.summary} 
                                                defaultValue={CV.summary} 
                                                onChange= {handleChangeSummary}
                                            />
                                </Form.Item>
                      <Form.Item
                        label="Kinh nghiệm (Số tháng):"
                        name="experience"
                        validateStatus={validateExperience.status}
                        help={validateExperience.errorMsg}
                        className="label-cv"
                        required
                      >
                          <Input
                            className="max-width"
                            placeholder="Nhập số tháng kinh nghiệm"
                            defaultValue={CV.experience}
                            value={CV.experience}
                            type='number'
                            min={0}
                            onChange={handleChangeExperience}
                          />
                      </Form.Item>
                    
                            <Form.Item
                                label="Chuyên môn:"
                                name="speciality"
                                className="label-cv"
                                required
                            >
                                    
                                        <TextArea rows={5} value={CV.speciality} 
                                            defaultValue={CV.speciality} 
                                            onChange= {handleChangeSpeciality}
                                        />
                                        </Form.Item>
                           
                                    <Form.Item
                                        label="Chứng chỉ:"
                                        name="certificate"
                                        className="label-cv"
                                        required
                                    >
                                                <TextArea rows={5} value={CV.certificate} 
                                                    defaultValue={CV.certificate} 
                                                    onChange= {handleChangeCertificate}
                                                />
                                    </Form.Item>
                      <Form.Item
                        label="Lĩnh vực:"
                        name="fields"
                        validateStatus={validateFields.status}
                        help={validateFields.errorMsg}
                        className="label-cv"
                        required
                      >
                          <Select
                            mode="multiple"
                            label="Lĩnh vực"
                            style={{
                              width: "100%",
                            }}
                            defaultValue={CV.fields.map((item) => {
                              return item._id;
                            })}
                            value={CV.fields}
                            placeholder="Hãy chọn ít nhất một lĩnh vực"
                            onChange={handleChangeFields}
                            optionLabelProp="label"
                          >
                            {fields.map((field) => {
                              return (
                                <Option value={field._id} label={field.nameField}>
                                  <div className="demo-option-label-item">
                                    {field.nameField}
                                  </div>
                                </Option>
                              );
                            })}
                          </Select>
                      </Form.Item>
                      <Form.Item label="FILE CV:" className="label-cv" required>
                          <>
                          <input type='file' onChange={handleChange}></input>
                          {CV.file_cv?<a href={domain+CV.file_cv} target={"_blank"} rel="noreferrer">Link</a>:''}
                          </>
                      </Form.Item>
                    <Form.Item name="status" label="Trạng thái">
                        <Select
                          label="Trạng thái"
                          style={{
                            width: "100%",
                          }}
                          defaultValue={CV.status}
                          value={CV.status}
                          onChange={handleChangeStatus}
                          optionLabelProp="label"
                        >
                          <Option value={true} label="Public">
                            Public
                          </Option>
                          <Option value={false} label="Private">
                            Private
                          </Option>
                        </Select>
                    </Form.Item>
                    </>
                :
                    <div className="wrap-cv-display">
                        <div className="wrap-label-cv border-underline" ><span className="label-left-cv">Tổng quan</span></div>
                        <div className="text-cv">
                          <TextArea rows={5} value={CV.summary} defaultValue={CV.summary} disabled />
                        </div>
                        <p className="text-cv">{CV.experience?CV.experience+ 'tháng kinh nghiệm': ''}</p>
                        <>
                            <div className="wrap-label-cv border-underline"><span className="label-left-cv">Chuyên môn</span></div>
                            <div className="text-cv">
                              <TextArea rows={5} value={CV.speciality} defaultValue={CV.speciality} disabled />
                            </div>
                        </>
                            <div className="wrap-label-cv border-underline"><span className="label-left-cv">Chứng chỉ</span></div>
                                <div className="text-cv text5">
                                <TextArea rows={5} value={CV.certificate} defaultValue={CV.certificate} disabled />
                                </div>
                            <div>
                            <div className="wrap-label-cv"><span className="label-left-cv">Lĩnh vực</span></div>
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
                          <div className="wrap-label-cv"><span className="label-left-cv">Tệp đính kèm</span></div>
                          {CV.file_cv ? (
                          <a target='_blank' href={domain+CV.file_cv} rel="noreferrer" >Link CV</a>
                        ) : (
                          <p>Chưa có file CV đính kèm</p>
                        )}
                        <div className="wrap-label-cv"><span className="label-left-cv">Trạng thái</span></div>
                        <div className="status">{renderStatus()}</div>
                </div>
  }
                  <Form.Item>
                    <div className="group-button">{renderButtonGroup()}</div>
                  </Form.Item>
    
                </Form>
            </div>
        </div>
        </>
      );
    }else{
      return <div className="spin-container">
      <Spin />
    </div>;
  }
};
  