import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  MdAddShoppingCart,
  MdCancelPresentation,
  MdCategory,
  MdFeaturedPlayList,
  MdOutlineAddBox,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbUserScreen } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import logo from "../../assets/logoTransBg.png";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaBorderStyle, FaThList } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { BsDatabaseFillAdd } from "react-icons/bs";

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
    // {
    //   key: "/",
    //   icon: <LuLayoutDashboard size={24} />,
    //   label: (
    //     <Link to="/" className="">
    //       Dashboard
    //     </Link>
    //   ),
    // },

    // {
    //   key: "/banners",
    //   icon: <MdFeaturedPlayList size={24} />,
    //   label: <Link to="/banners">Banners</Link>,
    // },

    {
      key: "/users",
      icon: <TbUserScreen size={24} />,
      label: <Link to="/users">Customers</Link>,
    },
    // {
    //   key: "/vendors",
    //   icon: <PiUserPlus size={24} />,
    //   label: <Link to="/vendors">Barbers</Link>,
    // },
    {
      key: "productMenu",
      icon: <AiFillProduct size={24} />,
      label: "Product",
      children: [
        {
          key: "/productList",
          icon: <FaThList size={24} />,
          label: (
            <Link to="/productList" className="text-white hover:text-white">
              Product List
            </Link>
          ),
        },
        {
          key: "/addProduct",
          icon: <MdAddShoppingCart size={24} />,
          label: (
            <Link to="/addProduct" className="text-white hover:text-white">
              Add Product
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
      key: "categoryMenu",
      icon: <MdCategory size={24} />,
      label: "Category",
      children: [
        {
          key: "/addCategory",
          icon: <MdOutlineAddBox size={24} />,
          label: (
            <Link to="/addCategory" className="text-white hover:text-white">
              Add Category
            </Link>
          ),
        },
        {
          key: "/addSubCategory",
          icon: <BsDatabaseFillAdd size={24} />,
          label: (
            <Link to="/addSubCategory" className="text-white hover:text-white">
              Add Sub Category
            </Link>
          ),
        },
      ],
    },
    // {
    //   key: "/cancellation",
    //   icon: <MdCancelPresentation size={24} />,
    //   label: <Link to="/cancellation">Cancellation</Link>,
    // },
    // {
    //   key: "/our-transactions",
    //   icon: <FaMoneyBillTransfer size={24} />,
    //   label: <Link to="/our-transactions">Transactions</Link>,
    // },

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
          key: "/addAdmin",
          label: (
            <Link to="/addAdmin" className="text-white hover:text-white">
              Admin Management
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
        // {
        //   key: "/offer-list",
        //   label: (
        //     <Link to="/offer-list" className="text-white hover:text-white">
        //       Offer List
        //     </Link>
        //   ),
        // },
        // {
        //   key: "/about-us",
        //   label: (
        //     <Link to="/about-us" className="text-white hover:text-white">
        //       About Us
        //     </Link>
        //   ),
        // },
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
      key: "/overview",
      icon: <MdFeaturedPlayList size={24} />,
      label: <Link to="/overview">Overview</Link>,
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
