import React, { useState } from "react";
import { ConfigProvider, Input, Table, Button, Space } from "antd";
import { Link, useParams } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";
import { FaEye, FaLocationDot } from "react-icons/fa6";
import { IoIosCalculator } from "react-icons/io";
import { TbShoppingCartCheck } from "react-icons/tb";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import SalesTrackingChart from "../../components/ui/Home/SalesTrackingChart";
import CompanySalesTrackingChart from "./CompanySalesAndTrackingChart";

const Overview = () => {
  const { id } = useParams();
  const [searchText, setSearchText] = useState("");

  // Sample company data
  const company = {
    name: "Company A",
    id: "#5568164",
    email: "companyA@example.com",
    address: {
      street: "123 Main St",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
    },
    phone: "+1 (555) 123-4567",
    imgUrl: "https://i.postimg.cc/yYfPfqKL/Rectangle-5211.png",
    remainingBudget: "123",
    totalSpend: "100",
    totalBudget: "100",
    totalOrder: "455",
    employees: [
      {
        id: "1",
        name: "John Doe",
        email: "johndoe@example.com",
        budgetList: "$10,000",
        expireOn: "2023-12-31",
        designation: "Manager",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "janesmith@example.com",
        budgetList: "$8,000",
        expireOn: "2023-11-30",
        designation: "Developer",
      },
      {
        id: "3",
        name: "Alice Johnson",
        email: "alicejohnson@example.com",
        budgetList: "$12,000",
        expireOn: "2023-10-31",
        designation: "Designer",
      },
      {
        id: "4",
        name: "Bob Brown",
        email: "bobbrown@example.com",
        budgetList: "$9,000",
        expireOn: "2023-09-30",
        designation: "Tester",
      },
      {
        id: "5",
        name: "Charlie Davis",
        email: "charliedavis@example.com",
        budgetList: "$11,000",
        expireOn: "2023-08-31",
        designation: "Product Manager",
      },
      {
        id: "6",
        name: "Diana Evans",
        email: "dianaevans@example.com",
        budgetList: "$7,500",
        expireOn: "2023-07-31",
        designation: "HR",
      },
      {
        id: "7",
        name: "Ethan Foster",
        email: "ethanfoster@example.com",
        budgetList: "$13,000",
        expireOn: "2023-06-30",
        designation: "Sales",
      },
      {
        id: "8",
        name: "Fiona Green",
        email: "fionagreen@example.com",
        budgetList: "$10,500",
        expireOn: "2023-05-31",
        designation: "Marketing",
      },
      {
        id: "9",
        name: "George Harris",
        email: "georgeharris@example.com",
        budgetList: "$14,000",
        expireOn: "2023-04-30",
        designation: "Support",
      },
      {
        id: "10",
        name: "Hannah White",
        email: "hannahwhite@example.com",
        budgetList: "$15,000",
        expireOn: "2023-03-31",
        designation: "Finance",
      },
    ],
  };

  const imgUrl =
    company?.imgUrl ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtj40PvvTQ1g64pgKZ2oKEk-tqT9rA4CXSA&s";

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredEmployees = company.employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Budget List",
      dataIndex: "budgetList",
      key: "budgetList",
    },
    {
      title: "Expire On",
      dataIndex: "expireOn",
      key: "expireOn",
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
          <Link to={`/employee/details/${record.id}`}>
            <Button className="bg-[#e9b007] text-white border-none">
              <FaEye size={24} />
            </Button>
          </Link>
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
              src={company?.imgUrl}
              alt=""
            />
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-3">
            <h1 className="text-3xl font-bold">{company?.name}</h1>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <MdOutlineEmail /> {company?.email}
            </p>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <MdOutlineLocalPhone /> {company?.phone}
            </p>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <FaLocationDot /> {company?.address?.street}
            </p>
          </div>
        </div>
        <div className="w-[75%] px-10">
          <div className="grid grid-col-1 md:grid-cols-4 gap-5">
            <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
              <div className="p-6 rounded-2xl bg-[#f3f3ff]">
                <TbShoppingCartCheck size={40} />
              </div>
              <h1 className="text-lg text-gray-600">Total Order</h1>
              <h1 className="text-2xl font-bold">{company?.totalOrder}</h1>
            </div>
            <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
              <div className="p-6 rounded-2xl bg-[#fff6da]">
                <IoIosCalculator size={40} />
              </div>
              <h1 className="text-lg text-gray-600">Total Budget</h1>
              <h1 className="text-2xl font-bold">{company?.totalBudget}</h1>
            </div>
            <div className="flex flex-col hover:shadow-xl px-10 rounded-2xl shadow-md py-6 gap-3 items-center">
              <div className="p-6 rounded-2xl bg-[#edf6fd]">
                <RiMoneyCnyCircleLine size={40} />
              </div>
              <h1 className="text-lg text-gray-600">Total Spend</h1>
              <h1 className="text-2xl font-bold">{company?.totalSpend}</h1>
            </div>
            <div className="flex flex-col hover:shadow-xl px-8 rounded-2xl shadow-md py-6 gap-3 items-center">
              <div className="p-6 rounded-2xl bg-[#fce7e7]">
                <GiMoneyStack size={40} />
              </div>
              <h1 className="text-lg text-gray-600">Remaining Budget</h1>
              <h1 className="text-2xl font-bold">{company?.remainingBudget}</h1>
            </div>
          </div>
          <div className="bg-white p-5 my-5 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold ms-7 my-1">Total Orders</h1>
            <CompanySalesTrackingChart />
          </div>
        </div>
      </div>
      <div className="my-10">
        <Input
          placeholder="Search by employee name"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 400, height: 40, marginBottom: 16 }}
        />
        <Table
          columns={columns}
          dataSource={filteredEmployees}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1000 }}
        />
      </div>
    </div>
  );
};

export default Overview;
