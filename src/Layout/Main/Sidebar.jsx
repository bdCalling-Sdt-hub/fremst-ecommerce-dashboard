import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  MdCancelPresentation,
  MdCategory,
  MdFeaturedPlayList,
  MdMiscellaneousServices,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { TbUserScreen } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

import { PiUserPlus } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import Cookies from "js-cookie";
import logo from "../../assets/logoTransBg.png";
import { DiGoogleAnalytics } from "react-icons/di";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaMoneyBillTransfer, FaScissors } from "react-icons/fa6";
import { FaBorderStyle } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
    Cookies.remove("refreshToken");
    navigate("/auth/login");
  };

  const menuItems = [
    {
      key: "/",
      icon: <LuLayoutDashboard size={24} />,
      label: (
        <Link to="/" className="">
          Dashboard
        </Link>
      ),
    },

    // {
    //   key: "/banners",
    //   icon: <MdFeaturedPlayList size={24} />,
    //   label: <Link to="/banners">Banners</Link>,
    // },

    {
      key: "/customers",
      icon: <TbUserScreen size={24} />,
      label: <Link to="/customers">Customers</Link>,
    },
    {
      key: "/vendors",
      icon: <PiUserPlus size={24} />,
      label: <Link to="/vendors">Barbers</Link>,
    },
    {
      key: "subMenuSalon",
      icon: <FaScissors size={24} />,
      label: "Salon",
      children: [
        {
          key: "/services",
          icon: <MdMiscellaneousServices size={24} />,
          label: (
            <Link to="/services" className="text-white hover:text-white">
              Services
            </Link>
          ),
        },
        {
          key: "/salon-category",
          icon: <BiSolidCategoryAlt size={24} />,
          label: (
            <Link to="/salon-category" className="text-white hover:text-white">
              Category
            </Link>
          ),
        },
        {
          key: "/sub-category",
          icon: <MdCategory size={24} />,
          label: (
            <Link to="/sub-category" className="text-white hover:text-white">
              Sub Category
            </Link>
          ),
        },
      ],
    },
    {
      key: "/orders",
      icon: <FaBorderStyle size={24} />,
      label: <Link to="/orders">Orders</Link>,
    },
    {
      key: "/cancellation",
      icon: <MdCancelPresentation size={24} />,
      label: <Link to="/cancellation">Cancellation</Link>,
    },
    {
      key: "/our-transactions",
      icon: <FaMoneyBillTransfer size={24} />,
      label: <Link to="/our-transactions">Transactions</Link>,
    },

    {
      key: "subMenuSetting",
      icon: <IoSettingsOutline size={24} />,
      label: "Settings",
      children: [
        {
          key: "/personal-information",
          label: (
            <Link
              to="/personal-information"
              className="text-white hover:text-white"
            >
              Personal Information
            </Link>
          ),
        },
        {
          key: "/change-password",
          label: (
            <Link to="/change-password" className="text-white hover:text-white">
              Change Password
            </Link>
          ),
        },
        {
          key: "/offer-list",
          label: (
            <Link to="/offer-list" className="text-white hover:text-white">
              Offer List
            </Link>
          ),
        },
        {
          key: "/about-us",
          label: (
            <Link to="/about-us" className="text-white hover:text-white">
              About Us
            </Link>
          ),
        },
        {
          key: "/terms-and-condition",
          label: (
            <Link
              to="/terms-and-condition"
              className="text-white hover:text-white"
            >
              Terms And Condition
            </Link>
          ),
        },
        {
          key: "/privacy-policy",
          label: (
            <Link to="/privacy-policy" className="text-white hover:text-white">
              Privacy Policy
            </Link>
          ),
        },
        {
          key: "/f-a-q",
          label: (
            <Link to="/f-a-q" className="text-white hover:text-white">
              FAQ
            </Link>
          ),
        },
      ],
    },
    {
      key: "/logout",
      icon: <IoIosLogOut size={24} />,
      label: <p onClick={handleLogout}>Logout</p>,
    },
  ];

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path]);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div className="mt-5 overflow-y-scroll">
      <div className="px-10">
        <Link
          to={"/"}
          className="mb-10 flex items-center flex-col gap-2 justify-center py-4"
        >
          <img src={logo} alt="" />
        </Link>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        style={{ borderRightColor: "transparent", background: "transparent" }}
        items={menuItems}
      />
    </div>
  );
};

export default Sidebar;
