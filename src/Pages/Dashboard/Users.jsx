import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Input,
  Modal,
  Form,
  InputNumber,
  Upload,
} from "antd";
import { Link } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { IoMdAdd } from "react-icons/io";
import { FaEye } from "react-icons/fa6";

const Users = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Dummy data for users
  const users = {
    data: {
      data: [
        {
          id: "1",
          company: "Company A",
          logo: "https://via.placeholder.com/50?text=A",
          admin: 3,
          totalEmployee: 50,
          totalBudget: 100000,
          totalOrder: 120,
        },
        {
          id: "2",
          company: "Company B",
          logo: "https://via.placeholder.com/50?text=B",
          admin: 2,
          totalEmployee: 30,
          totalBudget: 75000,
          totalOrder: 80,
        },
        {
          id: "3",
          company: "Company C",
          logo: "https://via.placeholder.com/50?text=C",
          admin: 1,
          totalEmployee: 20,
          totalBudget: 50000,
          totalOrder: 60,
        },
        {
          id: "4",
          company: "Company D",
          logo: "https://via.placeholder.com/50?text=D",
          admin: 4,
          totalEmployee: 100,
          totalBudget: 200000,
          totalOrder: 150,
        },
        {
          id: "5",
          company: "Company E",
          logo: "https://via.placeholder.com/50?text=E",
          admin: 2,
          totalEmployee: 40,
          totalBudget: 90000,
          totalOrder: 110,
        },
        {
          id: "6",
          company: "Company F",
          logo: "https://via.placeholder.com/50?text=F",
          admin: 3,
          totalEmployee: 60,
          totalBudget: 120000,
          totalOrder: 130,
        },
        {
          id: "7",
          company: "Company G",
          logo: "https://via.placeholder.com/50?text=G",
          admin: 1,
          totalEmployee: 25,
          totalBudget: 60000,
          totalOrder: 70,
        },
        {
          id: "8",
          company: "Company H",
          logo: "https://via.placeholder.com/50?text=H",
          admin: 2,
          totalEmployee: 35,
          totalBudget: 80000,
          totalOrder: 90,
        },
        {
          id: "9",
          company: "Company I",
          logo: "https://via.placeholder.com/50?text=I",
          admin: 4,
          totalEmployee: 110,
          totalBudget: 220000,
          totalOrder: 160,
        },
        {
          id: "10",
          company: "Company J",
          logo: "https://via.placeholder.com/50?text=J",
          admin: 3,
          totalEmployee: 55,
          totalBudget: 105000,
          totalOrder: 125,
        },
        {
          id: "11",
          company: "Company K",
          logo: "https://via.placeholder.com/50?text=K",
          admin: 2,
          totalEmployee: 45,
          totalBudget: 95000,
          totalOrder: 115,
        },
        {
          id: "12",
          company: "Company L",
          logo: "https://via.placeholder.com/50?text=L",
          admin: 1,
          totalEmployee: 15,
          totalBudget: 40000,
          totalOrder: 50,
        },
        {
          id: "13",
          company: "Company M",
          logo: "https://via.placeholder.com/50?text=M",
          admin: 3,
          totalEmployee: 65,
          totalBudget: 130000,
          totalOrder: 140,
        },
        {
          id: "14",
          company: "Company N",
          logo: "https://via.placeholder.com/50?text=N",
          admin: 2,
          totalEmployee: 38,
          totalBudget: 85000,
          totalOrder: 95,
        },
        {
          id: "15",
          company: "Company O",
          logo: "https://via.placeholder.com/50?text=O",
          admin: 4,
          totalEmployee: 120,
          totalBudget: 240000,
          totalOrder: 170,
        },
        {
          id: "16",
          company: "Company P",
          logo: "https://via.placeholder.com/50?text=P",
          admin: 3,
          totalEmployee: 58,
          totalBudget: 110000,
          totalOrder: 128,
        },
        {
          id: "17",
          company: "Company Q",
          logo: "https://via.placeholder.com/50?text=Q",
          admin: 2,
          totalEmployee: 42,
          totalBudget: 92000,
          totalOrder: 112,
        },
        {
          id: "18",
          company: "Company R",
          logo: "https://via.placeholder.com/50?text=R",
          admin: 1,
          totalEmployee: 18,
          totalBudget: 45000,
          totalOrder: 55,
        },
        {
          id: "19",
          company: "Company S",
          logo: "https://via.placeholder.com/50?text=S",
          admin: 3,
          totalEmployee: 68,
          totalBudget: 135000,
          totalOrder: 145,
        },
        {
          id: "20",
          company: "Company T",
          logo: "https://via.placeholder.com/50?text=T",
          admin: 2,
          totalEmployee: 36,
          totalBudget: 82000,
          totalOrder: 92,
        },
      ],
    },
  };

  const data = users?.data?.data;

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddCustomer = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      setIsModalVisible(false);
      // Add the new customer to the data
      const newCustomer = {
        id: (data.length + 1).toString(),
        ...values,
      };
      users.data.data.push(newCustomer);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const filteredData = data.filter((item) =>
    item.company.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.logo}
            alt={record.company}
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
          <span>{record.company}</span>
        </div>
      ),
    },
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
    },
    {
      title: "Total Employee",
      dataIndex: "totalEmployee",
      key: "totalEmployee",
    },
    {
      title: "Total Budget",
      dataIndex: "totalBudget",
      key: "totalBudget",
      render: (budget) => `$${budget.toLocaleString()}`,
      sorter: (a, b) => a.totalBudget - b.totalBudget,
    },
    {
      title: "Total Order",
      dataIndex: "totalOrder",
      key: "totalOrder",
      sorter: (a, b) => a.totalOrder - b.totalOrder,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Link to={`/company/details/${record.id}`}>
            <Button className="bg-[#e9b006] text-white border-none">
              <FaEye size={24} />
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold my-5">Customers</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Input
          placeholder="Search by company name"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 200, height: 40 }}
        />
        <Button
          className="py-5 bg-primary text-white"
          onClick={handleAddCustomer}
        >
          <IoMdAdd size={24} /> Add Customer
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize, onChange: () => setPageSize() }}
        scroll={{ x: 1000 }}
      />
      <Modal
        title="Add Customer"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="border-t-8 rounded-t-2xl border-primary"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="company"
            label="Company Name"
            rules={[
              { required: true, message: "Please input the company name!" },
            ]}
          >
            <Input placeholder="Enter company name" className="bg-gray-50" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Company Email"
            rules={[
              { required: true, message: "Please input the company email!" },
            ]}
          >
            <Input placeholder="Enter company email" className="bg-gray-50" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Company Phone Number"
            rules={[
              {
                required: true,
                message: "Please input the company phone number!",
              },
            ]}
          >
            <Input
              placeholder="Enter company phone number"
              className="bg-gray-50"
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Company Address"
            rules={[
              { required: true, message: "Please input the company address!" },
            ]}
          >
            <Input.TextArea
              placeholder="Enter company address"
              className="bg-gray-50"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password
              placeholder="Enter password"
              className="bg-gray-50"
            />
          </Form.Item>
          <Form.Item
            name="logo"
            label="Company Logo"
            rules={[
              { required: true, message: "Please upload the company logo!" },
            ]}
            style={{ width: "100%" }}
          >
            <Upload
              name="logo"
              listType="picture"
              maxCount={1}
              beforeUpload={() => false} // Prevent automatic upload
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Button icon={<UploadOutlined />}>Upload Logo</Button>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Users;
