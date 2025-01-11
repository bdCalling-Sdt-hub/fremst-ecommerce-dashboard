import React, { useState } from "react";
import { Form, Input, Button, Upload, Select, InputNumber, Tag } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const AddProduct = () => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  const sizeOptions = ["S", "M", "L", "XL", "2XL", "3XL"];
  const colorOptions = ["Red", "Blue", "Green", "Yellow", "Black", "White"];
  const brandOptions = ["Brand A", "Brand B", "Brand C"];
  const tagOptions = ["Tag 1", "Tag 2", "Tag 3"];

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const color = value;
    return (
      <Tag
        color={color}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3, border: "1px solid #4E4E4E", width: 60 }}
      ></Tag>
    );
  };

  const primaryTagRender = (props) => {
    const { label, closable, onClose } = props;
    return (
      <Tag
        color="primary"
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3, backgroundColor: "#007bff", color: "#fff" }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-semibold mb-5">Add New Product</h1>
      <Form layout="vertical" onFinish={handleSubmit}>
        <div className="flex">
          {/* Left Side */}
          <div className="w-1/2 pr-5 bg-white p-5 rounded-2xl border-t-8 border-primary">
            <Form.Item
              name="productName"
              label="Product Name"
              rules={[
                { required: true, message: "Please input the product name!" },
              ]}
            >
              <Input placeholder="Enter product name" style={{ height: 40 }} />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Enter product description"
                style={{ height: 100 }}
              />
            </Form.Item>
            <Form.Item
              name="additionalInfo"
              label="Additional Information"
              rules={[
                {
                  required: true,
                  message: "Please input the additional information!",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Enter additional information"
                style={{ height: 100 }}
              />
            </Form.Item>
            <Form.Item
              name="sizes"
              label="Sizes"
              rules={[{ required: true, message: "Please select the sizes!" }]}
            >
              <Select
                mode="tags"
                style={{ width: "100%", height: 40 }}
                placeholder="Select sizes"
                options={sizeOptions.map((size) => ({ value: size }))}
              />
            </Form.Item>
            <Form.Item
              name="colors"
              label="Colors"
              rules={[{ required: true, message: "Please select the colors!" }]}
            >
              <Select
                mode="tags"
                style={{ width: "100%", height: 40 }}
                placeholder="Select colors"
                options={colorOptions.map((color) => ({ value: color }))}
                tagRender={tagRender}
              />
            </Form.Item>
            <Form.Item
              name="regularPrice"
              label="Regular Price"
              rules={[
                { required: true, message: "Please input the regular price!" },
              ]}
            >
              <InputNumber
                min={0}
                placeholder="Enter regular price"
                style={{ width: "100%", height: 40 }}
              />
            </Form.Item>
            <Form.Item
              name="salesPrice"
              label="Sales Price"
              rules={[
                { required: true, message: "Please input the sales price!" },
              ]}
            >
              <InputNumber
                min={0}
                placeholder="Enter sales price"
                style={{ width: "100%", height: 40 }}
              />
            </Form.Item>
          </div>

          {/* Right Side */}
          <div className="w-1/2 pl-5 flex flex-col">
            <div className="flex-1 mb-5 bg-white p-5 rounded-2xl border-t-8 border-primary">
              <Form.Item
                name="images"
                label="Product Images"
                rules={[
                  { required: true, message: "Please upload product images!" },
                ]}
              >
                <Upload
                  listType="picture-card"
                  maxCount={4}
                  fileList={fileList}
                  beforeUpload={() => false} // Prevent automatic upload
                  onChange={handleUpload}
                >
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </div>
            <div className="flex-1 bg-white p-5 rounded-2xl border-t-8 border-primary">
              <Form.Item
                name="category"
                label="Category"
                rules={[
                  { required: true, message: "Please select a category!" },
                ]}
              >
                <Select placeholder="Select category" style={{ height: 40 }}>
                  <Option value="category1">Category 1</Option>
                  <Option value="category2">Category 2</Option>
                  <Option value="category3">Category 3</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="subCategory"
                label="Sub Category"
                rules={[
                  { required: true, message: "Please select a sub category!" },
                ]}
              >
                <Select
                  placeholder="Select sub category"
                  style={{ height: 40 }}
                >
                  <Option value="subCategory1">Sub Category 1</Option>
                  <Option value="subCategory2">Sub Category 2</Option>
                  <Option value="subCategory3">Sub Category 3</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="brand"
                label="Brand"
                rules={[
                  { required: true, message: "Please select the brands!" },
                ]}
              >
                <Select
                  mode="tags"
                  style={{ width: "100%", height: 40 }}
                  placeholder="Select brands"
                  options={brandOptions.map((brand) => ({ value: brand }))}
                  tagRender={primaryTagRender}
                />
              </Form.Item>
              <Form.Item
                name="tag"
                label="Tag"
                rules={[{ required: true, message: "Please select the tags!" }]}
              >
                <Select
                  mode="tags"
                  style={{ width: "100%", height: 40 }}
                  placeholder="Select tags"
                  options={tagOptions.map((tag) => ({ value: tag }))}
                  tagRender={primaryTagRender}
                />
              </Form.Item>
              <Form.Item
                name="availability"
                label="Availability"
                rules={[
                  { required: true, message: "Please select availability!" },
                ]}
              >
                <Select
                  placeholder="Select availability"
                  style={{ height: 40 }}
                >
                  <Option value="inStock">In Stock</Option>
                  <Option value="outOfStock">Out of Stock</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-5 gap-3">
          <Button className="py-5">Cancel</Button>
          <Button className="bg-primary text-white py-5" htmlType="submit">
            Publish Product
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
