import React, { useState } from "react";
import { Table, Input, Button, Space, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { MdAdd, MdDelete, MdEditSquare } from "react-icons/md";

const { Option } = Select;

const ProductList = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Dummy product data
  const products = [
    {
      id: "1",
      name: "Product A",
      category: "Category 1",
      price: "$100",
      status: "Available",
      publishedDate: "2023-01-01",
    },
    {
      id: "2",
      name: "Product B",
      category: "Category 2",
      price: "$200",
      status: "Unavailable",
      publishedDate: "2023-02-01",
    },
    {
      id: "3",
      name: "Product C",
      category: "Category 1",
      price: "$150",
      status: "Available",
      publishedDate: "2023-03-01",
    },
    {
      id: "4",
      name: "Product D",
      category: "Category 3",
      price: "$250",
      status: "Unavailable",
      publishedDate: "2023-04-01",
    },
    {
      id: "5",
      name: "Product E",
      category: "Category 2",
      price: "$300",
      status: "Available",
      publishedDate: "2023-05-01",
    },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (statusFilter === "All" || statusFilter === ""
        ? true
        : product.status === statusFilter)
    );
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <span
          className={`${
            record.status === "Available" ? "text-green-600" : "text-red-600"
          } px-2 py-1 rounded`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Published Date",
      dataIndex: "publishedDate",
      key: "publishedDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button>
            <MdEditSquare size={24} className="text-green-600" />
          </Button>
          <Button>
            <MdDelete size={24} className="text-red-600" />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-4xl heading text-primary font-semibold my-5">
        Product List <span className="text-sm">({products?.length})</span>
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <Input
            placeholder="Search by product name"
            value={searchText}
            onChange={handleSearch}
            style={{ width: 200, height: 40 }}
          />
          <Select
            placeholder="Filter by status"
            onChange={handleStatusFilter}
            style={{ width: 200, height: 40 }}
            allowClear
          >
            <Option value="All">All</Option>
            <Option value="Available">Available</Option>
            <Option value="Unavailable">Unavailable</Option>
          </Select>
        </div>
        <Link to="/addProduct">
          <Button className="bg-primary text-white" style={{ height: 45 }}>
            <MdAdd size={24} /> Add Product
          </Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={filteredProducts}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default ProductList;
