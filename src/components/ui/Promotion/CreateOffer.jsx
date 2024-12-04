import React from "react";
import { Button, DatePicker, Form, Input, Upload } from "antd";
import { BiUpload } from "react-icons/bi";

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    span: 24, // Full width for label
  },
  wrapperCol: {
    span: 24, // Full width for input
  },
};

const onFinish = (values) => {
  console.log("Success:", values);
};

const props = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      console.log(`${info.file.name} file upload failed.`);
    }
  },
};

const CreateOffer = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <Form
        className="bg-white border p-4 rounded-xl w-full max-w-2xl"
        {...formItemLayout}
        onFinish={onFinish}
      >
        <h1 className="text-lg font-bold my-3">Create an Offer</h1>
        {/* Input Field */}
        <Form.Item
          label={<span className="text-gray-700 font-medium">Title</span>}
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
          style={{ marginBottom: "12px" }} // Reduces gap between input fields
        >
          <Input placeholder="Enter offer title" />
        </Form.Item>

        {/* RangePicker and Upload on Same Line */}
        <Form.Item style={{ marginBottom: "12px" }}>
          <div className="flex flex-col md:flex-row gap-2">
            {" "}
            {/* Reduced gap */}
            {/* RangePicker with Label */}
            <div className="flex-1">
              <label className="block mb-1 text-gray-700 font-medium">
                Validity
              </label>
              <Form.Item
                name="validity"
                rules={[
                  {
                    required: true,
                    message: "Please select the validity period",
                  },
                ]}
                style={{ marginBottom: 0 }}
              >
                <RangePicker style={{ width: "100%" }} />
              </Form.Item>
            </div>
            {/* Upload Input */}
            <div className="flex-1">
              <label className="block mb-1 text-gray-700 font-medium">
                Upload Promotion Image
              </label>
              <Form.Item
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
                rules={[{ required: true, message: "Please upload a file" }]}
                style={{ marginBottom: 0 }}
              >
                <Upload {...props}>
                  <Button className="w-full" icon={<BiUpload />} type="dashed">
                    Upload Image
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </div>
        </Form.Item>

        {/* TextArea */}
        <Form.Item
          label={<span className="text-gray-700 font-medium">Description</span>}
          name="description"
          style={{ marginBottom: "12px" }} // Reduces gap between input fields
        >
          <Input.TextArea rows={3} placeholder="Enter offer description" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item style={{ marginBottom: "12px" }}>
          <Button
            type="primary"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2"
            htmlType="submit"
          >
            Create Offer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateOffer;
