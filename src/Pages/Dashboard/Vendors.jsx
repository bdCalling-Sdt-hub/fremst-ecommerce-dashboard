import React, { useState } from "react";
import { Table, Button, Space, Avatar, Select } from "antd";
import { Link } from "react-router-dom";
import randomImg from "../../assets/randomProfile2.jpg";
import { imageUrl } from "../../redux/api/baseApi";

const Vendors = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  // Dummy data for barbers
  const barbers = {
    data: {
      data: [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          phoneNumber: "+123456789",
          address: "123 Main St, Cityville",
          experienceLevel: "Senior",
          rating: 4.8,
          totalServices: 120,
          totalEarnings: "$6000",
          status: "Active",
          profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
          complaint: null,
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          phoneNumber: "+123456780",
          address: "456 Secondary St, Townsville",
          experienceLevel: "Intermediate",
          rating: 4.5,
          totalServices: 200,
          totalEarnings: "$8000",
          status: "Inactive",
          profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
          complaint: null,
        },
        {
          id: "3",
          name: "Sam Wilson",
          email: "sam@example.com",
          phoneNumber: "+123456781",
          address: "789 Tertiary St, Suburb",
          experienceLevel: "Junior",
          rating: 4.2,
          totalServices: 50,
          totalEarnings: "$2000",
          status: "Suspended",
          profileImg: "https://randomuser.me/api/portraits/men/3.jpg",
          complaint: {
            reason: "Violation of salon policies",
            amount: "$50",
          },
        },
        // Add more dummy barbers as needed
      ],
    },
  };

  const data = barbers?.data?.data;

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const name = record.name || "Unknown";
        const imgUrl = record.profileImg || randomImg;
        const fullImgUrl = imgUrl.startsWith("http")
          ? imgUrl
          : `${imageUrl}${imgUrl}`;

        return (
          <Space>
            <Avatar src={fullImgUrl} alt={name} size="large" />
            <span>{name}</span>
          </Space>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Experience Level",
      dataIndex: "experienceLevel",
      key: "experienceLevel",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => a.rating - b.rating,
      render: (rating) => `${rating}`,
    },
    {
      title: "Total Services",
      dataIndex: "totalServices",
      key: "totalServices",
      sorter: (a, b) => a.totalServices - b.totalServices,
    },
    {
      title: "Total Earnings",
      dataIndex: "totalEarnings",
      key: "totalEarnings",
      sorter: (a, b) =>
        parseFloat(a.totalEarnings.replace("$", "")) -
        parseFloat(b.totalEarnings.replace("$", "")),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "Active":
            color = "green";
            break;
          case "Inactive":
            color = "red";
            break;
          case "Suspended":
            color = "orange";
            break;
          default:
            color = "gray";
        }

        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Complaint",
      dataIndex: "complaint",
      key: "complaint",
      filters: [
        { text: "None", value: "None" },
        { text: "Has Complaints", value: "HasComplaints" },
      ],
      onFilter: (value, record) => {
        if (value === "None") {
          return !record.complaint;
        } else if (value === "HasComplaints") {
          return record.complaint !== null;
        }
        return true;
      },
      render: (complaint) =>
        complaint ? (
          <span className="text-red-700 font-semibold">
            {complaint.amount},<br /> for {complaint.reason}
          </span>
        ) : (
          "None"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Link to={`/barber/profile/${record.id}`}>
            <Button className="bg-[#FFF4E3] text-[#F3B806] border-none">
              Details
            </Button>
          </Link>

          <Button className="border border-red-600 text-red-700">
            Restrict
          </Button>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 === 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 !== 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <>
      <h1 className="text-2xl font-semibold  my-5">Barbers</h1>
      <Table
        className="bg-white"
        pagination={{
          pageSize: pageSize,
        }}
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
      />
    </>
  );
};

export default Vendors;
