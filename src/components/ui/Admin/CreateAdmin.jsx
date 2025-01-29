import React, { useState } from "react";
import { Modal, Form, Input, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateAdminMutation } from "../../../redux/apiSlices/userSlice";
import toast from "react-hot-toast";

const { Option } = Select;

const CreateAdmin = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      let jsonPayload = {};
      const formData = new FormData();

      for (const key in values) {
        jsonPayload[key] = values[key];
      }

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      formData.append("data", JSON.stringify(jsonPayload));

      try {
        const response = await createAdmin(formData).unwrap();
        toast.success(response?.message || "Admin created successfully!");
        form.resetFields();
        setFileList([]);
        setOpen(false);
      } catch (error) {
        toast.error(error?.data?.message || "Failed to create admin");
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setOpen(false);
  };

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      title="Create Admin"
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input the email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="contact"
          label="Contact"
          rules={[
            { required: true, message: "Please input the contact!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please input the password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select the role!" }]}
        >
          <Select>
            <Option value="admin">Admin</Option>
            <Option value="super-admin">Super Admin</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="profile"
          label="Profile Image"
          rules={[{ required: true, message: "Please upload a profile image!" }]}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            fileList={fileList}
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleUpload}
          >
            {fileList.length >= 1 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAdmin;
