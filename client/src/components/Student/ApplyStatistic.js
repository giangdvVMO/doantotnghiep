import { Table } from "antd"
import { Link } from "react-router-dom";

export const ApplyStatistic = ({list})=>{
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
        <div className='statistic_container'>
            <div className='view-count_container'>
                <div>SỐ BÀI ĐĂNG ĐÃ ỨNG TUYỂN</div>
              </div>
            <div className='view-count_container'>
                <div className='statistic-number'>
                  <div>
                    {list.count}
                  </div>
                </div>
            </div>

            <div className='view-count_container'>
                <div>DANH SÁCH CHI TIẾT BÀI ĐĂNG ĐÃ ỨNG TUYỂN</div>
                </div>
            <div className='table-statistic'>
              <Table
              pagination={false}
                dataSource={list} 
                columns={columns}
                scroll={{
                  x: 400,
                  y: 400,
                }}
              />
            </div>
            </div>
    )
}