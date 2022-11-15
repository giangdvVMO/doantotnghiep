import { BookTwoTone, ContactsTwoTone } from "@ant-design/icons";
import { Avatar, Tag } from "antd";
import { Link } from "react-router-dom";
import {
  openNotificationWithIcon,
} from "../../common/service";
import { serverURL } from "../../configs/server.config";
import "../../styles/card.css";

export const CardListCV = ({ listCV, id_company }) => {

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

  return listCV.map((item) => {
    const classCss = item._id % 2 === 0 ? "card red" : "card green";
    const twoToneColor = item._id % 2 === 0 ? "#dE685E" : "#325C46";
    return (
      <>
        <div class={classCss}>
          <div class="additional">
            <div class="user-card">
              {/* <div class="level center-card">
                {changeExperience(item.experience)}
              </div> */}
              <Avatar
                className="avatar"
                src="https://joeschmoe.io/api/v1/random"
              />
              {/* {item.fields.map((field, index) => {
                if (index < 2) {
                  return (
                    <div class="points center-card">{field.nameField}</div>
                  );
                }
                if (index === 2) {
                  return (
                    <div class="points center-card">
                      {`+${item.fields.length - 2} lĩnh vực`}
                    </div>
                  );
                }
                return "";
              })} */}
            </div>
            <div class="more-info">
              <h1>{item.title}</h1>
              <div class="coords">
                <span>Họ và tên</span>
                <span>{item.account.fullname}</span>
              </div>
              <div class="coords">
                <span>Chuyên ngành</span>
                <span>{item.student.major}</span>
              </div>
              <div class="stats">
                <div>
                  <div class="titlecard">Khóa học</div>
                  <BookTwoTone size={10} twoToneColor={twoToneColor} />
                  <div class="value tiny">{item.student.course}</div>
                </div>
                <div>
                  <div class="titlecard">GPA</div>
                  <ContactsTwoTone size={10} twoToneColor={twoToneColor} />
                  <div class="value tiny">
                    {item.student.gpa}
                  </div>
                </div>
              </div>
              <div class="bottom-button">
                <Link
                  to={`../student/${item._id}`}
                  onClick={() => {
                    handleViewCV(item._id, id_company);
                  }}
                >
                  <div class="level">Xem chi tiết</div>
                </Link>
              </div>
            </div>
          </div>
          <div class="general">
            <h1>{item.title}</h1>
            <div class="fields">
                <p>Lĩnh vực</p>
                {
                    item.fields.map(field=>{
                        return (
                            <Tag color="#55acee" style={{margin: '5px'}}>{field.nameField}</Tag>
                        )
                    })
                }
            </div>
            <p class="hover">Hover để xem thêm</p>
          </div>
        </div>
      </>
    );
  });
};
