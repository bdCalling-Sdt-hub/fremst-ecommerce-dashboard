import { useState } from "react";

import profileImg from "../../assets/randomProfile4.jpg";
import profileImage from "../../assets/randomProfile.png";
import profileBanner from "../../assets/profileBanner.png";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { PiSuitcaseSimple } from "react-icons/pi";
import { FaEye, FaRegBuilding } from "react-icons/fa6";
import {
  MdOutlineEmail,
  MdOutlineLocalPhone,
  MdOutlineLocationOn,
} from "react-icons/md";
import { Button, Input, Select, Table } from "antd";
import moment from "moment";
import { TbShoppingCartCheck } from "react-icons/tb";
import { IoIosCalculator } from "react-icons/io";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";

const profile = {
  name: "John Doe",
  designation: "Marketing Manager",
  company: "TechSphere Innovations Ltd.",
  email: "johndoe@example.com",
  phone: "+1 123 456 7890",
  address: "123 Elm Street, Springfield, USA",
  profileImage: profileImg,
  budgetDetails: {
    assigned: "50,000",
    duration: "12 months",
    assignDate: "2024-01-01",
    expirationDate: "2024-12-31",
  },
  totalOrder: 120,
  totalBudget: "50,000",
  totalSpend: "35,000",
  remainingBudget: "15,000",
  orderHistory: [
    {
      _id: "1",
      productName: "Digital Marketing Campaign",
      item: "Social Media Ads",
      price: "5,000",
      status: "Completed",
      date: "2024-02-15",
    },
    {
      _id: "2",
      productName: "SEO Optimization",
      item: "On-page SEO",
      price: "3,000",
      status: "Completed",
      date: "2024-03-10",
    },
    {
      _id: "3",
      productName: "Brand Design",
      item: "Logo Design",
      price: "2,000",
      status: "In Progress",
      date: "2024-12-20",
    },
    {
      _id: "4",
      productName: "Content Marketing",
      item: "Blog Posts",
      price: "10,000",
      status: "Pending",
      date: "2024-12-25",
    },
    {
      _id: "5",
      productName: "PPC Campaign",
      item: "Google Ads",
      price: "8,000",
      status: "Completed",
      date: "2024-04-05",
    },
    {
      _id: "6",
      productName: "Website Development",
      item: "E-commerce Website",
      price: "50,000",
      status: "In Progress",
      date: "2024-05-12",
    },
    {
      _id: "7",
      productName: "Email Marketing",
      item: "Newsletter Campaign",
      price: "4,000",
      status: "Pending",
      date: "2024-06-15",
    },
    {
      _id: "8",
      productName: "App Development",
      item: "Mobile App",
      price: "100,000",
      status: "In Progress",
      date: "2024-07-18",
    },
    {
      _id: "9",
      productName: "Video Marketing",
      item: "YouTube Ads",
      price: "12,000",
      status: "Completed",
      date: "2024-08-25",
    },
    {
      _id: "10",
      productName: "Graphic Design",
      item: "Banner Design",
      price: "3,500",
      status: "Pending",
      date: "2024-09-10",
    },
    {
      _id: "11",
      productName: "SEO Services",
      item: "Technical SEO",
      price: "6,000",
      status: "Completed",
      date: "2024-10-01",
    },
    {
      _id: "12",
      productName: "Brand Strategy",
      item: "Market Analysis",
      price: "7,500",
      status: "In Progress",
      date: "2024-10-20",
    },
    {
      _id: "13",
      productName: "Photography",
      item: "Product Photoshoot",
      price: "15,000",
      status: "Pending",
      date: "2024-11-05",
    },
    {
      _id: "14",
      productName: "Social Media Management",
      item: "Monthly Content Plan",
      price: "9,000",
      status: "Completed",
      date: "2024-11-15",
    },
    {
      _id: "15",
      productName: "Public Relations",
      item: "Press Release",
      price: "20,000",
      status: "Completed",
      date: "2024-11-30",
    },
  ],
};

const EmployeeProfile = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  const filteredOrderHistory = profile.orderHistory.filter((order) => {
    return (
      order.productName.toLowerCase().includes(searchText.toLowerCase()) &&
      (statusFilter ? order.status === statusFilter : true)
    );
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
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
      render: (text) => (
        <span
          className={
            text === "Completed"
              ? "text-green-500"
              : text === "In Progress"
              ? "text-blue-500"
              : "text-red-500"
          }
        >
          {text}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <span>{moment(date).format("L")}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: () => <FaEye size={20} color="#292C61" />,
    },
  ];

  return (
    <div className="max-w-[1500px] mx-auto my-10 flex gap-5 w-full">
      <div className="w-[35%]">
        <div className="border rounded-2xl shadow-md relative">
          <img
            className="w-full rounded-t-2xl h-[180px]"
            src={profileBanner}
            alt="profileBanner"
          />
          <div className="absolute flex flex-col items-center top-12 left-5 ">
            <div className="w-48 h-48 border-8 rounded-full border-white">
              <img
                className="object-cover w-full h-full rounded-full"
                src={profile?.profileImage}
                alt="profileImg"
                width={200}
                height={200}
              />
            </div>
            <p className="text-md flex items-center gap-4">
              {profile?.name}{" "}
              <span>
                <BsFillPatchCheckFill color="#1e88e5" size={30} />
              </span>
            </p>
          </div>
          <div className="mt-36 px-8 mb-8">
            <h1 className="flex items-center gap-2 text-lg">
              <span>
                <PiSuitcaseSimple />
              </span>
              {profile?.designation}
            </h1>
            <h1 className="flex items-center gap-2 text-lg">
              <span>
                <FaRegBuilding />
              </span>
              {profile?.company}
            </h1>
            <h1 className="flex items-center gap-2 text-lg">
              <span>
                <MdOutlineEmail />
              </span>
              {profile?.email}
            </h1>
            <h1 className="flex items-center gap-2 text-lg">
              <span>
                <MdOutlineLocalPhone />
              </span>
              {profile?.phone}
            </h1>
            <h1 className="flex items-center gap-2 text-lg">
              <span>
                <MdOutlineLocationOn />
              </span>
              {profile?.address}
            </h1>
          </div>
        </div>

        <div className="shadow-md">
          <h1 className="bg-primary text-white px-10 py-3 rounded-t-2xl font-semibold">
            Budget Details
          </h1>
          <div className="p-5">
            <h1 className="text-lg">
              Assigned Budget: <span>${profile?.budgetDetails?.assigned}</span>
            </h1>
            <h1 className="text-lg">
              Assigned Budget: <span>{profile?.budgetDetails?.duration}</span>
            </h1>
            <h1 className="text-lg">
              Assigned Budget:{" "}
              <span>
                {moment(profile?.budgetDetails?.assignDate).format("LL")}
              </span>
            </h1>
            <h1 className="text-lg">
              Assigned Budget:{" "}
              <span>
                {moment(profile?.budgetDetails?.expirationDate).format("LL")}
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="w-[65%]">
        <div className="grid grid-col-1 md:grid-cols-4 gap-5">
          <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
            <div className="p-6 rounded-2xl bg-[#f3f3ff]">
              <TbShoppingCartCheck size={40} />
            </div>
            <h1 className="text-lg text-gray-600">Total Order</h1>
            <h1 className="text-2xl font-bold">{profile?.totalOrder}</h1>
          </div>
          <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
            <div className="p-6 rounded-2xl bg-[#fff6da]">
              <IoIosCalculator size={40} />
            </div>
            <h1 className="text-lg text-gray-600">Total Budget</h1>
            <h1 className="text-2xl font-bold">{profile?.totalBudget}</h1>
          </div>
          <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
            <div className="p-6 rounded-2xl bg-[#edf6fd]">
              <RiMoneyCnyCircleLine size={40} />
            </div>
            <h1 className="text-lg text-gray-600">Total Spend</h1>
            <h1 className="text-2xl font-bold">{profile?.totalSpend}</h1>
          </div>
          <div className="flex flex-col hover:shadow-xl px-8 rounded-2xl shadow-md py-6 gap-3 items-center">
            <div className="p-6 rounded-2xl bg-[#fce7e7]">
              <GiMoneyStack size={40} />
            </div>
            <h1 className="text-lg text-gray-600">Remaining Budget</h1>
            <h1 className="text-2xl font-bold">{profile?.remainingBudget}</h1>
          </div>
        </div>

        <p className="mt-10">My Order History</p>
        <div className="flex justify-between items-center my-5">
          <Input
            placeholder="Search by product name"
            value={searchText}
            onChange={handleSearch}
            style={{ width: "30%" }}
          />
          <Select
            placeholder="Filter by status"
            onChange={handleStatusChange}
            style={{ width: "20%" }}
            allowClear
          >
            <Select.Option value="Completed">Completed</Select.Option>
            <Select.Option value="In Progress">In Progress</Select.Option>
            <Select.Option value="Pending">Pending</Select.Option>
          </Select>
        </div>

        <Table
          columns={columns}
          dataSource={filteredOrderHistory}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default EmployeeProfile;
