// import { Col, Row, Card, Statistic, Table, message, Button, Popconfirm } from "antd";
// import { useEffect, useState } from "react";
// import {
//   AuditOutlined,
//   UserOutlined,
//   PieChartOutlined,
//   StockOutlined,
// } from "@ant-design/icons";

// import type { ColumnsType } from "antd/es/table";
// import { GetUsers, DeleteUsersById } from "../../services/https/index";
// interface DataType {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
//   tags: string[];
// }

// const columns: ColumnsType<DataType> = [
//   {
//     title: "ลำดับ",
//     dataIndex: "ID",
//     key: "id",
//   },

//   {
//     title: "ชื่อ",
//     dataIndex: "first_name",
//     key: "firstname",
//   },

//   {
//     title: "นามสกุุล",
//     dataIndex: "last_name",
//     key: "lastname",
//   },

//   {
//     title: "อีเมล",
//     dataIndex: "email",
//     key: "email",
//   },

//   {
//       title: "โทรศัพท์",
//       dataIndex: "phone",
//       key: "phone",
//     },


//   {
//     title: "ที่อยู่",
//     dataIndex: "address",
//     key: "address",
//   },


// ];

// const data: DataType[] = [

// ];

// export default function index() {
//   return (
//     <>
//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={24} md={24} lg={24} xl={24}>
//           <h2>แดชบอร์ด</h2>
//         </Col>

//         <Col xs={24} sm={24} md={24} lg={24} xl={24}>
//           <Card style={{ backgroundColor: "#F5F5F5" }}>
//             <Row gutter={[16, 16]}>
//               <Col xs={24} sm={24} md={12} lg={12} xl={6}>
//                 <Card
//                   bordered={false}
//                   style={{
//                     boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//                   }}
//                 >
//                   <Statistic
//                     title="จำนวน"
//                     value={1800}
//                     prefix={<StockOutlined />}
//                   />
//                 </Card>
//               </Col>

//               <Col xs={24} sm={24} md={12} lg={12} xl={6}>
//                 <Card
//                   bordered={false}
//                   style={{
//                     boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//                   }}
//                 >
//                   <Statistic
//                     title="จำนวน"
//                     value={200}
//                     valueStyle={{ color: "black" }}
//                     prefix={<AuditOutlined />}
//                   />
//                 </Card>
//               </Col>

//               <Col xs={24} sm={24} md={12} lg={12} xl={6}>
//                 <Card
//                   bordered={false}
//                   style={{
//                     boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//                   }}
//                 >
//                   <Statistic
//                     title="จำนวน"
//                     value={3000}
//                     valueStyle={{ color: "black" }}
//                     prefix={<PieChartOutlined />}
//                   />
//                 </Card>
//               </Col>

//               <Col xs={24} sm={24} md={12} lg={12} xl={6}>
//                 <Card
//                   bordered={false}
//                   style={{
//                     boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//                   }}
//                 >
//                   <Statistic
//                     title="จำนวน"
//                     value={100}
//                     valueStyle={{ color: "black" }}
//                     prefix={<UserOutlined />}
//                   />
//                 </Card>
//               </Col>
//             </Row>
//           </Card>
//         </Col>

//         <Col xs={24} sm={24} md={24} lg={24} xl={24}>
//           <h3>ผู้ใช้งานล่าสุด</h3>
//         </Col>

//         <Col xs={24} sm={24} md={24} lg={24} xl={24}>
//           <Table columns={columns} dataSource={data} />
//         </Col>
//       </Row>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { Col, Row, Card, Statistic, Table, message, } from "antd";
import {
  AuditOutlined,
  UserOutlined,
  PieChartOutlined,
  StockOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetUsersThisHour, DeleteUsersById } from "../../services/https/index";
import { GetCountUser } from "../../services/https/index";
interface DataType {
  key: string;
  ID: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
}
const columns: ColumnsType<DataType> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "ชื่อ",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "นามสกุุล",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "อีเมล",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "โทรศัพท์",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ที่อยู่",
      dataIndex: "address",
      key: "address",
    },
  ];

export default function IndexPage() {
  const [data, setUsers] = useState<DataType[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [countUser, setCountUser] = useState<number>(0); //  สร้าง state

  // ✅ โหลดข้อมูลผู้ใช้งาน
  const getUsers = async () => {
    const res = await GetUsersThisHour();
    if (res.status === 200) {
      const formatted = res.data.map((item: any) => ({
        key: item.ID.toString(),
        ...item,
      }));
      setUsers(formatted);
    } else {
      setUsers([]);
      messageApi.error(res.data.error || "โหลดข้อมูลล้มเหลว");
    }
  };
  const getCount = async () => {
    const res = await GetCountUser();
    console.log("Count API Response:", res);
    if (res.status === 200) {
      setCountUser(res.data);
    }
    else {
    console.error("GetCountUser failed", res);
    }
  };

  useEffect(() => {
    getUsers();
    getCount();
  }, []);

  return (
    <>
    {contextHolder}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h2>แดชบอร์ด</h2>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ backgroundColor: "#F5F5F5" }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวน"
                    value={0}
                    prefix={<StockOutlined />}
                  />
                </Card>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวน"
                    value={0}
                    valueStyle={{ color: "black" }}
                    prefix={<AuditOutlined />}
                  />
                </Card>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวน"
                    value={0}
                    valueStyle={{ color: "black" }}
                    prefix={<PieChartOutlined />}
                  />
                </Card>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวน"
                    value={countUser}
                    valueStyle={{ color: "black" }}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <h3>ผู้ใช้งานล่าสุด</h3>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </>
  );
}

