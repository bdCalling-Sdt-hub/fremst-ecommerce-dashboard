import React, { useState } from "react";
import { Form, Input, Button, Upload, Table, Space } from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { MdDelete, MdEditSquare } from "react-icons/md";

const { TextArea } = Input;

const AddSubCategory = () => {
  const [fileList, setFileList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([
    {
      key: "1",
      id: "1",
      name: "Category A",
      image:
        "https://i.postimg.cc/QxY4q3nL/brushed-cotton-euro-sham-dusk-lightbox-cpg-15864-jpg.png",
      stock: 100,
    },
    {
      key: "2",
      id: "2",
      name: "Category B",
      image:
        "https://i.postimg.cc/QxY4q3nL/brushed-cotton-euro-sham-dusk-lightbox-cpg-15864-jpg.png",
      stock: 200,
    },
    {
      key: "3",
      id: "3",
      name: "Category B",
      image:
        "https://i.postimg.cc/QxY4q3nL/brushed-cotton-euro-sham-dusk-lightbox-cpg-15864-jpg.png",
      stock: 200,
    },
    {
      key: "4",
      id: "4",
      name: "Category B",
      image:
        "https://i.postimg.cc/QxY4q3nL/brushed-cotton-euro-sham-dusk-lightbox-cpg-15864-jpg.png",
      stock: 200,
    },
    {
      key: "5",
      id: "5",
      name: "Category B",
      image:
        "https://i.postimg.cc/QxY4q3nL/brushed-cotton-euro-sham-dusk-lightbox-cpg-15864-jpg.png",
      stock: 200,
    },
    {
      key: "6",
      id: "6",
      name: "Category B",
      image:
        "https://i.postimg.cc/QxY4q3nL/brushed-cotton-euro-sham-dusk-lightbox-cpg-15864-jpg.png",
      stock: 200,
    },
  ]);

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    // Add logic to handle form submission
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <div className="bg-gray-200 p-3 w-24 h-20 flex items-center justify-center rounded-lg">
          <img
            className="rounded-xl object-cover w-full h-full"
            src={image}
            alt="category"
            style={{ width: 50, height: 50 }}
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
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
    <div className="container mx-auto p-5">
      <h1 className="text-3xl heading mb-5">Add Sub Category</h1>
      <div className="flex">
        {/* Add Category Section */}
        <div className="w-1/2 pr-5 h-[350px] bg-white p-5 rounded-2xl border-t-8 border-primary">
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="subCategoryName"
              label="Sub Category Name"
              rules={[
                {
                  required: true,
                  message: "Please input the sub category name!",
                },
              ]}
            >
              <Input
                placeholder="Enter sub category name"
                style={{ height: 40 }}
              />
            </Form.Item>
            <Form.Item
              name="subCategoryImage"
              label="Sub Category Image"
              rules={[
                {
                  required: true,
                  message: "Please upload a sub category image!",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                fileList={fileList}
                beforeUpload={() => false}
                onChange={handleUpload}
              >
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <div className="text-end">
              <Button
                className="bg-primary rounded-xl text-white py-5"
                htmlType="submit"
              >
                Publish
              </Button>
            </div>
          </Form>
        </div>

        {/* Categories Table */}
        <div className="w-1/2 pl-5">
          <Input
            placeholder="Search sub categories"
            value={searchText}
            onChange={handleSearch}
            style={{ width: 300, marginBottom: 16, height: 40 }}
          />
          <Table
            columns={columns}
            dataSource={filteredCategories}
            rowKey="id"
          />
        </div>
      </div>
    </div>
  );
};

export default AddSubCategory;
