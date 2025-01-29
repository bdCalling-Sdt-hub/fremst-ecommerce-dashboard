import { Form, Input } from "antd";
import React from "react";
import { useChangePasswordMutation } from "../../../redux/apiSlices/authSlice";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [changePassword] = useChangePasswordMutation();

  const handleChangePassword =  (values) => {
    console.log("Mutation Function:", changePassword);
    console.log("Values Submitted:", values);
  
    try {
      const response =  changePassword(values).unwrap();
      console.log("Response:", response);
      toast.success("Password changed successfully");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error?.data?.message || "Failed to change password");
    }
  };
  
  
  return (
    <div className="px-6 lg:px-12 mt-8">
      <Form
        form={form}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleChangePassword}
        className="w-full lg:w-1/2"
      >
        <Form.Item
          name="currentPassword"
          label={<p className="block">Current Password</p>}
          rules={[
            {
              required: true,
              message: "Please input your current password!",
            },
          ]}
          className="mb-5"
        >
          <Input.Password
            placeholder="Enter Password"
            className="border border-gray-300 h-[50px] bg-white rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label={<p className="block">New Password</p>}
          dependencies={["current_password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("current_password") === value) {
                  return Promise.reject(
                    new Error(
                      "The new password and current password do not match!"
                    )
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
          className="mb-5"
        >
          <Input.Password
            placeholder="Enter password"
            className="border border-gray-300 h-[50px] bg-white rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={<p className="block">Re-Type Password</p>}
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered does not match!")
                );
              },
            }),
          ]}
          className="mb-10"
        >
          <Input.Password
            placeholder="Enter password"
            className="border border-gray-300 h-[50px] bg-white rounded-lg"
          />
        </Form.Item>

        <Form.Item className="flex  justify-end">
        <button
          type="submit"
          className="bg-primary text-white w-36 h-11 rounded-lg"
  
        >
save
        </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
