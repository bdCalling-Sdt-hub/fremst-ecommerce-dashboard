import React, { useState } from "react";
import {
  ConfigProvider,
  Input,
  Table,
  Button,
  Space,
  Form,
  Modal,
  Upload,
  Select,
  Checkbox,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";
import { FaEye, FaInbox, FaLocationDot, FaTrash } from "react-icons/fa6";
import { IoIosCalculator } from "react-icons/io";
import { TbShoppingCartCheck } from "react-icons/tb";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import SalesTrackingChart from "../../components/ui/Home/SalesTrackingChart";
import {
  useCreateEmployeeMutation,
  useDeleteUserMutation,
  useGetCompanyProfileQuery,
  useGetEmployeesForCompanyQuery,
  useUpdateEmployeeMutation,
} from "../../redux/apiSlices/userSlice";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import Currency from "../../utils/Currency";

const Overview = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [changeBudget, setChangeBudget] = useState(false);

  console.log(editItem);
  console.log(changeBudget);

  const { data: company, isFetching, refetch } = useGetCompanyProfileQuery();
  const {
    data: companyEmployees,
    isFetching: isEmployeesFetching,
    refetch: refetchEmployees,
  } = useGetEmployeesForCompanyQuery();

  const [createEmployee] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [deleteEmployee] = useDeleteUserMutation();

  if (isFetching || isEmployeesFetching) {
    return <div>Loading...</div>;
  }

  const companyData = company?.data || {};
  const employeesData = companyEmployees?.data?.data || [];

  console.log("employeesData", employeesData);

  const imgUrl =
    companyData?.user?.profile ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtj40PvvTQ1g64pgKZ2oKEk-tqT9rA4CXSA&s";

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddEmployee = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleFormSubmit = async (values) => {
    // Ensure the uploaded file is properly extracted
    console.log(values);
    const file = values.image?.[0]?.originFileObj;

    // if (!file) {
    //   toast.error("Please upload a valid image");
    //   return;
    // }

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
      password: values.password,
      designation: values.designation,
      role: "employee",
      company: companyData?._id,
      isBudgetUpdated: changeBudget,
    };

    if (changeBudget) {
      data.budget = Number(values.budget);
      data.duration = Number(values.duration);
    } else {
      delete data.budget;
      delete data.duration;
    }

    formData.append("data", JSON.stringify(data));
    formData.append("image", file);

    try {
      if (editItem) {
        const response = await updateEmployee({
          id: editItem?.user?._id,
          data: formData,
        }).unwrap();

        if (response.success) {
          refetch();
          refetchEmployees();
          setEditItem(null);
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
        }
      } else {
        const response = await createEmployee(formData).unwrap();
        console.log(response);
        if (response.success) {
          refetch();
          refetchEmployees();
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
        }
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }

    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteEmployee(id).unwrap();
      toast.success(
        response?.data?.message || "Employee deleted successfully!"
      );
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete employee!");
    }
  };
  const filteredEmployees = employeesData.filter((employee) =>
    employee?.user?.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (record) => {
    console.log(record);
    setEditItem(record);
    form.setFieldsValue({
      name: record?.user?.name,
      email: record?.user?.email,
      contact: record?.user?.contact,
      streetAddress: record?.user?.address?.streetAddress,
      city: record?.user?.address?.city,
      postalCode: record?.user?.address?.postalCode,
      designation: record?.designation,
      budget: record?.budget,
      duration: record?.user?.duration,
      image: null,
    });

    form.setFieldsValue({
      image: [
        {
          uid: record._id, // Unique ID for the file
          name: "current_image.png", // Name of the image
          status: "done", // Status of the file
          url: record?.user?.profile?.startsWith("http")
            ? record?.user?.profile
            : `${import.meta.env.VITE_BASE_URL}${record?.user?.profile}`,
        },
      ],
    });

    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: ["user", "name"],
      key: "user.name",
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "user.email",
    },
    {
      title: "Budget Left",
      dataIndex: "budgetLeft",
      key: "budgetLeft",
      render: (value) => <span>{value} kr</span>, // Ensures formatting only when rendering
    },
    {
      title: "Expire On",
      dataIndex: "budgetExpiredAt",
      key: "budgetExpiredAt",
      render: (text, record) => (
        <span>
          {new Date(record?.budgetExpiredAt)?.toLocaleString("en-US")}
        </span>
      ),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Link to={`/employee/details/${record._id}`}>
            <Button className="bg-[#e9b007] text-white border-none">
              <FaEye size={24} />
            </Button>
          </Link>

          <Button
            onClick={() => {
              handleEdit(record);
            }}
            className="bg-primary text-white border-none"
          >
            <CiEdit size={24} />
          </Button>
          <Button
            onClick={() => {
              handleDelete(record?.user?._id);
            }}
            className="bg-red-600 text-white border-none"
          >
            <FaTrash size={24} />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex w-full">
        <div className="w-[25%] flex gap-5 flex-col">
          <div className="p-5 rounded-xl shadow-md bg-white">
            <img
              className="w-80 h-80 mx-auto rounded-xl object-cover"
              src={
                imgUrl?.startsWith("http")
                  ? imgUrl
                  : `${import.meta.env.VITE_BASE_URL}${imgUrl}`
              }
              alt=""
            />
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-3">
            <h1 className="text-3xl font-bold">{companyData?.user?.name}</h1>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <MdOutlineEmail /> {companyData?.user?.email}
            </p>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <MdOutlineLocalPhone /> {companyData?.user?.contact}
            </p>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <FaLocationDot />{" "}
              {companyData?.user?.address
                ? companyData?.user?.address?.streetAddress
                  ? `${companyData?.user?.address?.streetAddress} ${companyData?.user?.address?.city} ${companyData?.user?.address?.postalCode}`
                  : ""
                : "N/A"}
            </p>
          </div>
        </div>
        <div className="w-[75%] px-10">
          <div className="grid grid-col-1 md:grid-cols-4 gap-5">
            <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
              <div className="p-6 rounded-2xl bg-[#f3f3ff]">
                <TbShoppingCartCheck size={40} />
              </div>
              <h1 className="text-lg text-gray-600">Total Employees</h1>
              <h1 className="text-2xl font-bold">
                {companyData?.totalEmployees || 0}
              </h1>
            </div>

            <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
              <div className="p-6 rounded-2xl bg-[#fff6da]">
                <IoIosCalculator size={40} />
              </div>
              <h1 className="text-lg text-gray-600">Total Orders</h1>
              <h1 className="text-2xl font-bold">
                {companyData?.totalOrders || 0}
              </h1>
            </div>

            <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
              <div className="p-6 rounded-2xl bg-[#edf6fd]">
                <RiMoneyCnyCircleLine size={40} />
              </div>
              <h1 className="text-lg text-gray-600">Total budget</h1>
              <h1 className="text-2xl font-bold">
                {companyData?.totalBudget || 0} <Currency />
              </h1>
            </div>
            <div className="flex flex-col hover:shadow-xl px-8 rounded-2xl shadow-md py-6 gap-3 items-center">
              <div className="p-6 rounded-2xl bg-[#fce7e7]">
                <GiMoneyStack size={40} />
              </div>
              <h1 className="text-lg text-gray-600">Total Spent</h1>
              <h1 className="text-2xl font-bold">
                {companyData?.totalSpentBudget || 0} <Currency />
              </h1>
            </div>
          </div>
          <div className="bg-white p-5 my-5 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold ms-7 my-1">Total Orders</h1>
            <SalesTrackingChart />
          </div>
        </div>
      </div>
      <div className="my-10 flex justify-between">
        <Input
          placeholder="Search by employee name"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 400, height: 40 }}
        />
        <Button
          className="bg-primary px-7 py-5 text-white border-none"
          onClick={handleAddEmployee}
        >
          Add Employee
        </Button>
      </div>
      <Table
        columns={columns}
        rowKey="_id"
        dataSource={filteredEmployees}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
      />
      <Modal
        title={
          <h2 style={{ fontSize: "22px", fontWeight: "bold" }}>Add Employee</h2>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <div className="flex w-full gap-3">
            <div className="w-1/2">
              <Form.Item
                name="name"
                label="Employee Name"
                rules={[{ required: true, message: "Please enter the name" }]}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>

              <Form.Item name="contact" label="Phone Number">
                <Input placeholder="316 123456" />
              </Form.Item>

              <div className="flex w-full gap-3">
                <Form.Item name="streetAddress" label="Street Address">
                  <Input placeholder="Enter Street Address" />
                </Form.Item>
                <Form.Item name="city" label="City">
                  <Input placeholder="Enter City" />
                </Form.Item>
                <Form.Item name="postalCode" label="Postal Code">
                  <Input placeholder="Enter Postal Code" />
                </Form.Item>
              </div>

              {!editItem && (
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please enter a password" },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters",
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter Password" />
                </Form.Item>
              )}
            </div>
            <div>
              <Form.Item
                name="image"
                label="Employee Image"
                // rules={[{ required: true, message: "Please upload an image" }]}
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList} // Ensures form receives fileList
              >
                <Upload.Dragger
                  beforeUpload={() => false} // Prevents automatic upload
                  listType="picture"
                  maxCount={1}
                >
                  <p className="ant-upload-drag-icon">
                    <FaInbox />
                  </p>
                  <p className="ant-upload-text">
                    Drop your image here or Click to upload
                  </p>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item
                name="designation"
                label="Designation"
                rules={[
                  { required: true, message: "Please enter a designation" },
                ]}
              >
                <Input placeholder="Enter employee Designation" />
              </Form.Item>

              <div className="flex flex-col gap-0">
                <div className="flex w-full gap-3">
                  <div className="w-1/2">
                    <Form.Item
                      name="budget"
                      label="Budget Amount"
                      rules={[
                        {
                          required: true,
                          message: "Please enter budget amount",
                        },
                        {
                          pattern: new RegExp(/^[0-9]+$/),
                          message: "Only numbers are allowed",
                        },
                      ]}
                    >
                      <Input
                        disabled={!changeBudget}
                        type="number"
                        placeholder="Enter Employee Budget"
                        min={0}
                      />
                    </Form.Item>
                  </div>
                  <Form.Item
                    className="w-1/2"
                    name="duration"
                    label="Budget Duration"
                  >
                    <Select disabled={!changeBudget} defaultValue="6 Months">
                      <Option value="1">1 Months</Option>
                      <Option value="3">3 Months</Option>
                      <Option value="6">6 Months</Option>
                      <Option value="12">12 Months</Option>
                      <Option value="18">18 Months</Option>
                      <Option value="24">24 Months</Option>
                    </Select>
                  </Form.Item>
                </div>
                <Checkbox
                  style={{ marginLeft: "10px" }}
                  checked={changeBudget}
                  onChange={(e) => setChangeBudget(e.target.checked)}
                >
                  Change Budget & Duration
                </Checkbox>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Overview;
