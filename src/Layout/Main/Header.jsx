import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Badge, Select } from "antd";
import logo from "../../assets/randomProfile2.jpg";
import logo2 from "../../assets/logo.png";
import { useFetchUserProfileQuery } from "../../redux/apiSlices/authSlice";
import { io } from "socket.io-client";
import LanguageToggle from "../../components/LanguageToggle";
import { imageUrl } from "../../redux/api/baseApi";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const { Option } = Select;

const Header = () => {
  const { data: profileData, isLoading, refetch } = useFetchUserProfileQuery();

  const profile = profileData?.data;

  // console.log(profile);

  useEffect(() => {
    refetch();
  }, []);

  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const socket = io("http://164.90.205.5:5001", {
      query: {
        token: localStorage.getItem("authToken"),
      },
    });
    socket.on("notification::asd98234!3454@", (notification) => {
      console.log(notification);
      setNotificationCount((prev) => prev + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

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

      <LanguageSwitcher />

      {profile?.role === "admin" || profile?.role === "super-admin" ? (
        <div>
          <Link to="/notification">
            <Badge count={notificationCount} color="red">
              <FaRegBell size={25} />
            </Badge>
          </Link>
        </div>
      ) : null}

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
            profile?.profile
              ? profile?.profile?.startsWith("https")
                ? profile?.profile
                : `${imageUrl}${profile?.profile}`
              : profile?.user?.profile
              ? profile?.user?.profile?.startsWith("https")
                ? profile?.user?.profile
                : `${imageUrl}${profile?.user?.profile}`
              : logo
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
            {profile?.user?.name || profile?.name || "Guest"}
          </h2>
          <p className="text-sm">{profile?.user?.role || profile?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
