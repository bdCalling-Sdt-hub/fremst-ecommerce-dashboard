import React, { useState } from "react";
import {
  ConfigProvider,
  Input,
  Table,
  Button,
  Space,
  Form,
  Modal,
  Upload,
  Select,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";
import { FaEye, FaInbox, FaLocationDot } from "react-icons/fa6";
import { IoIosCalculator } from "react-icons/io";
import { TbShoppingCartCheck } from "react-icons/tb";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import SalesTrackingChart from "../../components/ui/Home/SalesTrackingChart";
import {
  useGetCompanyProfileQuery,
  useGetEmployeesForCompanyQuery,
} from "../../redux/apiSlices/userSlice";

const Overview = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { data: company, isFetching } = useGetCompanyProfileQuery();
  const { data: companyEmployees, isFetching: isEmployeesFetching } =
    useGetEmployeesForCompanyQuery();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const companyData = company?.data || {};
  const employeesData = companyEmployees?.data?.data || [];

  const imgUrl =
    companyData?.user?.profile ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtj40PvvTQ1g64pgKZ2oKEk-tqT9rA4CXSA&s";

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddEmployee = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleFormSubmit = (values) => {
    console.log("Employee Data:", values);
    setIsModalOpen(false);
    form.resetFields();
  };

  const filteredEmployees = employeesData.filter((employee) =>
    employee?.user?.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: ["user", "name"],
      key: "user.name",
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "user.email",
    },
    {
      title: "Budget Left",
      dataIndex: "budgetLeft",
      key: "budgetLeft",
      render: (value) => value?.toFixed(2), // Ensures formatting only when rendering
    },
    {
      title: "Expire On",
      dataIndex: "budgetExpiredAt",
      key: "budgetExpiredAt",
      render: (text, record) => (
        <span>
          {new Date(record?.budgetExpiredAt)?.toLocaleString("en-US")}
        </span>
      ),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Link to={`/employee/details/${record._id}`}>
            <Button className="bg-[#e9b007] text-white border-none">
              <FaEye size={24} />
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex w-full">
        <div className="w-[25%] flex gap-5 flex-col">
          <div className="p-5 rounded-xl shadow-md bg-white">
            <img
              className="w-80 h-80 mx-auto rounded-xl object-cover"
              src={
                imgUrl?.startsWith("http")
                  ? imgUrl
                  : `${import.meta.env.VITE_BASE_URL}${imgUrl}`
              }
              alt=""
            />
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-3">
            <h1 className="text-3xl font-bold">{companyData?.user?.name}</h1>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <MdOutlineEmail /> {companyData?.user?.email}
            </p>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <MdOutlineLocalPhone /> {companyData?.user?.contact}
            </p>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <FaLocationDot /> {companyData?.user?.address}
            </p>
          </div>
        </div>
        <div className="w-[75%] px-10">
          <div className="grid grid-col-1 md:grid-cols-4 gap-5">
            <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
              <div className="p-6 rounded-2xl bg-[#f3f3ff]">
                <TbShoppingCartCheck size={40} />
              </div>
              <h1 className="text-lg text-gray-600">Total Employees</h1>
              <h1 className="text-2xl font-bold">
                {companyData?.totalEmployees || 0}
              </h1>
            </div>

            <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
              <div className="p-6 rounded-2xl bg-[#fff6da]">
                <IoIosCalculator size={40} />
              </div>
              <h1 className="text-lg text-gray-600">Total Orders</h1>
              <h1 className="text-2xl font-bold">
                {companyData?.totalOrders || 0}
              </h1>
            </div>

            <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
              <div className="p-6 rounded-2xl bg-[#edf6fd]">
                <RiMoneyCnyCircleLine size={40} />
              </div>
              <h1 className="text-lg text-gray-600">Total budget</h1>
              <h1 className="text-2xl font-bold">
                {companyData?.totalBudget || 0}
              </h1>
            </div>
            <div className="flex flex-col hover:shadow-xl px-8 rounded-2xl shadow-md py-6 gap-3 items-center">
              <div className="p-6 rounded-2xl bg-[#fce7e7]">
                <GiMoneyStack size={40} />
              </div>
              <h1 className="text-lg text-gray-600">Total Spent</h1>
              <h1 className="text-2xl font-bold">
                {companyData?.totalSpentBudget || 0}
              </h1>
            </div>
          </div>
          <div className="bg-white p-5 my-5 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold ms-7 my-1">Total Orders</h1>
            <SalesTrackingChart />
          </div>
        </div>
      </div>
      <div className="my-10 flex justify-between">
        <Input
          placeholder="Search by employee name"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 400, height: 40 }}
        />
        <Button
          className="bg-primary px-7 py-5 text-white border-none"
          onClick={handleAddEmployee}
        >
          Add Employee
        </Button>
      </div>
      <Table
        columns={columns}
        rowKey="_id"
        dataSource={filteredEmployees}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
      />
      <Modal
        title={
          <h2 style={{ fontSize: "22px", fontWeight: "bold" }}>Add Employee</h2>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <Form.Item
              name="name"
              label="Employee Name *"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input placeholder="Enter Name" />
            </Form.Item>
            <Form.Item
              name="image"
              label="Employee Image *"
              rules={[{ required: true, message: "Please upload an image" }]}
            >
              <Upload.Dragger>
                <p className="ant-upload-drag-icon">
                  <FaInbox />
                </p>
                <p className="ant-upload-text">
                  Drop your image here or Click to upload
                </p>
              </Upload.Dragger>
            </Form.Item>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <Form.Item
              name="email"
              label="Email *"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number">
              <Input addonBefore={"+43"} placeholder="316 123456" />
            </Form.Item>
          </div>
          <Form.Item name="address" label="Address">
            <Input.TextArea placeholder="Enter Address" />
          </Form.Item>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <Form.Item
              name="password"
              label="Password *"
              rules={[{ required: true, message: "Please enter a password" }]}
            >
              <Input.Password placeholder="Enter Password" />
            </Form.Item>
            <Form.Item
              name="designation"
              label="Designation *"
              rules={[
                { required: true, message: "Please enter a designation" },
              ]}
            >
              <Select placeholder="Enter employee Designation">
                <Option value="manager">Manager</Option>
                <Option value="developer">Developer</Option>
              </Select>
            </Form.Item>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <Form.Item
              name="budget"
              label="Budget Amount *"
              rules={[
                { required: true, message: "Please enter budget amount" },
              ]}
            >
              <Input placeholder="Enter Employee Budget" />
            </Form.Item>
            <Form.Item
              name="duration"
              label="Budget Duration *"
              rules={[{ required: true, message: "Please select duration" }]}
            >
              <Select defaultValue="6 Months">
                <Option value="3 Months">3 Months</Option>
                <Option value="6 Months">6 Months</Option>
                <Option value="12 Months">12 Months</Option>
              </Select>
            </Form.Item>
          </div>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Overview;
