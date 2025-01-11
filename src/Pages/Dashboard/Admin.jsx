import { Table, Input, Button, Select, Space } from "antd";
import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import CreateAdmin from "../../components/ui/Admin/CreateAdmin";
import Title from "../../components/common/Title";

const { Option } = Select;

const data = [
  {
    key: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    createdAt: "2023-01-01",
    image: "https://via.placeholder.com/50",
  },
  {
    key: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Editor",
    createdAt: "2023-02-01",
    image: "https://via.placeholder.com/50",
  },
  {
    key: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Admin",
    createdAt: "2023-03-01",
    image: "https://via.placeholder.com/50",
  },
  {
    key: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    role: "Viewer",
    createdAt: "2023-04-01",
    image: "https://via.placeholder.com/50",
  },
  {
    key: 5,
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    role: "Editor",
    createdAt: "2023-05-01",
    image: "https://via.placeholder.com/50",
  },
];

const Admin = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleRoleChange = (value, record) => {
    const updatedData = data.map((item) =>
      item.key === record.key ? { ...item, role: value } : item
    );
    // Update the state or perform any other necessary actions with updatedData
    console.log(updatedData);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "index",
      key: "index",
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <img
            src={record.image}
            alt={record.name}
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
          <span>{record.name}</span>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record) => (
        <Select
          defaultValue={text}
          onChange={(value) => handleRoleChange(value, record)}
          style={{ width: 120 }}
        >
          <Option value="Admin">Admin</Option>
          <Option value="Editor">Editor</Option>
          <Option value="Viewer">Viewer</Option>
        </Select>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <RiDeleteBin5Line size={24} className="text-red-600" />
      ),
    },
  ];

  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <Title className="">Admins</Title>
      </div>

      {/* search input and add button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Input
          placeholder="Search by name"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 400, height: 40 }}
        />
        <Button
          className="bg-primary text-white"
          onClick={() => {
            setOpen(true);
          }}
          style={{ height: 40 }}
        >
          + Add Admin
        </Button>
      </div>

      {/* table container */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        rowKey="key"
      />
      <CreateAdmin open={open} setOpen={setOpen} />
    </div>
  );
};

export default Admin;
