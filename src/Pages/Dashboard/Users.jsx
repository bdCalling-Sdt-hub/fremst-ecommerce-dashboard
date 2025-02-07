import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Input,
  Modal,
  Form,
  Upload,
  Tooltip,
} from "antd";
import { Link } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { IoMdAdd } from "react-icons/io";
import { FaEye, FaTrash } from "react-icons/fa6";
import randomImg from "../../assets/randomProfile2.jpg";
import {
  useGetAllCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteUserMutation,
} from "../../redux/apiSlices/userSlice";
import toast from "react-hot-toast";
import Currency from "../../utils/Currency";
import logo from "../../assets/logo.png";

const Users = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentCompany, setCurrentCompany] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createCompany] = useCreateCompanyMutation();
  const [updateCompany] = useUpdateCompanyMutation();

  const { data: allCompanies, isFetching } = useGetAllCompaniesQuery();
  const [deleteCompany] = useDeleteUserMutation();

  if (isFetching || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  const companies = allCompanies?.data?.data;
  // console.log(companies);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddOrUpdate = (company = null) => {
    setCurrentCompany(company);
    form.resetFields();
    setFileList([]);

    if (company) {
      // Set initial values for the form fields
      form.setFieldsValue({
        name: company.user.name,
        email: company.user.email,
        contact: company.user.contact,
        streetAddress: company.user.address?.streetAddress,
        city: company.user.address?.city,
        postalCode: company.user.address?.postalCode,
        logo: [],
      });

      if (company.user.profile) {
        const logoUrl = company.user.profile.startsWith("https")
          ? company.user.profile
          : `${import.meta.env.VITE_BASE_URL}${company.user.profile}`;

        setFileList([
          {
            uid: "-1",
            name: "logo",
            status: "done",
            url: logoUrl,
          },
        ]);
      }
    }

    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      setLoading(true); // Enable loading state
      const values = await form.validateFields();

      const formData = new FormData();

      const data = {
        name: values.name,
        email: values.email,
        contact: values.contact,
        address: {
          streetAddress: values.streetAddress,
          city: values.city,
          postalCode: values.postalCode,
        },
        role: "company",
        password: values.password,
      };

      formData.append("data", JSON.stringify(data));

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      if (currentCompany) {
        const response = await updateCompany({
          id: currentCompany._id,
          data: formData,
        }).unwrap();
        toast.success(
          response?.data?.message || "Company updated successfully"
        );
        setIsModalVisible(false);
        form.resetFields();
      } else {
        const response = await createCompany(formData).unwrap();
        toast.success(response?.data?.message || "Company added successfully");
        setIsModalVisible(false);
        form.resetFields();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add company");
      console.error("Error handling form submission:", error);
    } finally {
      setLoading(false); // Disable loading state
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteCompany(id).unwrap();
      if (response?.success) {
        toast.success(response?.message || "Company deleted successfully");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete company");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFileList([]);
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => (
        <p>
          <Tooltip title={index + 1}>{index + 1}</Tooltip>
        </p>
      ),
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            className="object-cover rounded-md"
            src={
              record?.user?.profile
                ? record?.user?.profile?.startsWith("https")
                  ? record?.user?.profile
                  : `${import.meta.env.VITE_BASE_URL}${record?.user?.profile}`
                : randomImg
            }
            alt={record.company}
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
          <span>{record?.user?.name}</span>
        </div>
      ),
    },
    {
      title: "Total Employee",
      dataIndex: "totalEmployees",
      key: "totalEmployees",
    },
    {
      title: "Total Budget",
      dataIndex: "totalBudget",
      key: "totalBudget",
      render: (text) => (
        <p>
          {text} <Currency />
        </p>
      ),
    },
    {
      title: "Total Order",
      dataIndex: "totalOrders",
      key: "totalOrders",
    },
    {
      title: "Total Spent Budget",
      dataIndex: "totalSpentBudget",
      key: "totalSpentBudget",
      render: (text) => (
        <p>
          {text} <Currency />
        </p>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            onClick={() => handleAddOrUpdate(record)}
            className="bg-blue-500 text-white border-none"
          >
            Edit
          </Button>
          <Link to={`/company/details/${record._id}`}>
            <Button className="bg-[#e9b006] text-white border-none">
              <FaEye size={24} />
            </Button>
          </Link>

          <Button
            onClick={() => handleDelete(record?.user?._id)}
            className="bg-red-600 text-white border-none"
          >
            <FaTrash size={24} />
          </Button>
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
          onClick={() => handleAddOrUpdate()}
        >
          <IoMdAdd size={24} /> Add Customer
        </Button>
      </div>
      <Table
        columns={columns}
        rowKey="_id"
        dataSource={companies}
        pagination={{
          pageSize,
          onChange: (page, pageSize) => setPageSize(pageSize),
        }}
        scroll={{ x: 1000 }}
      />
      <Modal
        title={currentCompany ? "Update Customer" : "Add Customer"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="border-t-8 rounded-t-2xl border-primary"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
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
            <Input
              placeholder="Enter company email"
              className="bg-gray-50"
              disabled={!!currentCompany}
            />
          </Form.Item>
          <Form.Item
            name="contact"
            label="Company Contact Number"
            rules={[
              {
                required: true,
                message: "Please input the company contact number!",
              },
            ]}
          >
            <Input
              placeholder="Enter company contact number"
              className="bg-gray-50"
            />
          </Form.Item>
          <div className="flex gap-2">
            <Form.Item
              name="streetAddress"
              label="Street Address"
              rules={[
                { required: true, message: "Please input the street address!" },
              ]}
            >
              <Input
                placeholder="Enter street address"
                className="bg-gray-50"
              />
            </Form.Item>
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "Please input the city!" }]}
            >
              <Input placeholder="Enter city" className="bg-gray-50" />
            </Form.Item>
            <Form.Item
              name="postalCode"
              label="Postal Code"
              rules={[
                { required: true, message: "Please input the postal code!" },
              ]}
            >
              <Input placeholder="Enter postal code" className="bg-gray-50" />
            </Form.Item>
          </div>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: !currentCompany,
                message: "Please input the password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter password"
              className="bg-gray-50"
              disabled={!!currentCompany}
            />
          </Form.Item>
          <Form.Item name="logo" label="Company Logo">
            <Upload
              name="logo"
              listType="picture"
              maxCount={1}
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList }) => setFileList(fileList)}
            >
              <Button icon={<UploadOutlined />}>Upload Logo</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Users;
