import React from "react";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Badge, Select } from "antd";
import logo from "../../assets/randomProfile2.jpg";
import i18next from "i18next";
import { useFetchUserProfileQuery } from "../../redux/apiSlices/authSlice";
const baseUrl = import.meta.env.VITE_BASE_URL;

const { Option } = Select;

const Header = () => {
  const { data: profileData, isLoading, error } = useFetchUserProfileQuery();

  const { name, profile } = profileData?.data || {};
  
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex items-center justify-end gap-7 h-full">
      {/* Language Selector */}
      {/* <Select
        defaultValue={"en"} // Use the current language
        style={{ width: 120, height: "50px" }}
        onChange={handleSelectLanguage}
      >
        <Option value="en">
          <div
            style={{ display: "flex", alignItems: "center", height: "40px" }}
          >
            <img
              src="https://cdn.britannica.com/29/22529-004-ED1907BE/Union-Flag-Cross-St-Andrew-of-George.jpg"
              alt="English Flag"
              style={{ marginRight: 8, width: 16, height: 16 }}
            />
            English
          </div>
        </Option>
        <Option value="sw">
          <div
            style={{ display: "flex", alignItems: "center", height: "40px" }}
          >
            <img
              src="/flag.png"
              alt="Swedish Flag"
              style={{ marginRight: 8, width: 16, height: 16 }}
            />
            Swedish
          </div>
        </Option>
      </Select> */}

      <div>
        <Badge count={5}>
          <FaRegBell style={{ fontSize: "24px", color: "black" }} />
        </Badge>
      </div>
      {/* Profile Section */}
      <div
        style={{
          height: "55px",

          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          margin: "10px",
        }}
      >
        <img
          src={
            profile.startsWith("https")
              ? profile
              : `${import.meta.env.VITE_BASE_URL}${profile}`
          }
          alt={name || "User Profile"}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex flex-col">
          <h2
            style={{
              color: "black",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            {name || "Guest"}
          </h2>
          <p className="text-sm">Super Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
