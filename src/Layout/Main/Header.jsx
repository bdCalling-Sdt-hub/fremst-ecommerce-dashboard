import React from "react";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Badge, Select } from "antd";
import logo from "../../assets/randomProfile2.jpg";
import i18next from "i18next";

const { Option } = Select;

const Header = () => {
  // Mock profile data
  const profileData = {
    profile:
      "https://miro.medium.com/v2/resize:fit:400/1*B8c1ED3QV_yaa6PAWqDgMw.png",
    name: "John Doe",
  };

  const handleSelectLanguage = (lang) => {
    i18next.changeLanguage(lang);
  };

  return (
    <div className="flex items-center justify-end gap-7 h-full">
      {/* Language Selector */}
      <Select
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
      </Select>

      <div>
        <Badge count={5}>
          <FaRegBell style={{ fontSize: "24px", color: "black" }} />
        </Badge>
      </div>
      {/* Profile Section */}
      <Link
        to="/settings"
        style={{
          height: "55px",
          cursor: "pointer",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          margin: "10px",
        }}
      >
        <img
          src={profileData.profile}
          alt={profileData.name || "User Profile"}
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
            {profileData.name || "Guest"}
          </h2>
          <p className="text-sm">Super Admin</p>
        </div>
      </Link>
    </div>
  );
};

export default Header;
