import React, { useState } from "react";
import { Table, Button, Input, Select, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const dummyData = [
  {
    key: "1",
    id: "ORD001",
    productName: "Product A",
    customerName: "Alice Brown",
    items: 3,
    cost: 150,
    status: "In Progress",
    date: "2024-12-18",
  },
  {
    key: "2",
    id: "ORD002",
    productName: "Product B",
    customerName: "Bob Smith",
    items: 1,
    cost: 50,
    status: "Completed",
    date: "2024-12-19",
  },
  {
    key: "3",
    id: "ORD003",
    productName: "Product C",
    customerName: "Charlie Green",
    items: 2,
    cost: 100,
    status: "Pending",
    date: "2024-12-20",
  },
  {
    key: "4",
    id: "ORD004",
    productName: "Product D",
    customerName: "Diana White",
    items: 5,
    cost: 250,
    status: "Cancelled",
    date: "2024-12-21",
  },
  // Additional dummy data...
];

const RunningOrders = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
  };

  const filteredData = dummyData.filter(
    (item) =>
      item.productName.toLowerCase().includes(searchText.toLowerCase()) &&
      (statusFilter ? item.status === statusFilter : true)
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      sorter: (a, b) => a.items - b.items,
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      render: (cost) => `$${cost}`,
      sorter: (a, b) => a.cost - b.cost,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            status === "In Progress"
              ? "bg-orange-200 text-orange-600"
              : status === "Completed"
              ? "bg-green-200 text-green-600"
              : status === "Pending"
              ? "bg-yellow-200 text-yellow-600"
              : "bg-red-200 text-red-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleDelete = (key) => {
    console.log(`Deleting order with key: ${key}`);
    // Add logic to delete the order here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl heading my-5">Order History</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Space>
          <Input
            placeholder="Search"
            value={searchText}
            onChange={handleSearch}
            style={{ width: 400, height: 40 }}
          />
          <Select
            placeholder="Filter by status"
            onChange={handleStatusFilterChange}
            style={{ width: 200, height: 40 }}
            allowClear
          >
            <Option value="In Progress">In Progress</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
        </Space>
      </div>
      <Table columns={columns} dataSource={filteredData} rowKey="key" />
    </div>
  );
};

export default RunningOrders;
