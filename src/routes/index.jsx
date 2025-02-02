import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import Users from "../Pages/Dashboard/Users";
import Admin from "../Pages/Dashboard/Admin";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";

import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import Subscription from "../Pages/Dashboard/Subscription";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import User from "../Pages/Dashboard/User";

import Press from "../Pages/Dashboard/Press";
import Transactions from "../Pages/Dashboard/Transactions";

import Promotion from "../Pages/Dashboard/Promotion";

import UserProfile from "../Pages/Dashboard/AdminProfile/UserProfile";
import TermsAndCondition from "../Pages/Dashboard/TermsAndCondition";

import Vendors from "../Pages/Dashboard/Vendors";
import PrivateRoute from "./PrivateRoute";
import Banners from "../Pages/Dashboard/Banners";
import EditBanners from "../components/ui/Banners/EditBanners";
import AddBanners from "../components/ui/Banners/AddBanners";

import OurTransactions from "../Pages/Dashboard/OurTransactions";
import Faq from "../components/ui/Settings/Faq";
import AboutUs from "../components/ui/Settings/AboutUs";
import OfferList from "../components/ui/Settings/OfferList";
import Orders from "../Pages/Dashboard/Orders";
import Cancellation from "../Pages/Dashboard/Cancellation";
import Services from "../Pages/Dashboard/Salon/Services";
import Category from "../Pages/Dashboard/Salon/Category";
import SubCategory from "../Pages/Dashboard/Salon/SubCategory";
import Vendor from "../Pages/Dashboard/Vendor";
import EmployeeProfile from "../Pages/Dashboard/EmployeeProfile";
import AddProduct from "../Pages/Dashboard/Product/AddOrEditProduct";
import ProductList from "../Pages/Dashboard/Product/ProductList";
import AddCategory from "../Pages/Dashboard/category/AddCategory";
import AddSubCategory from "../Pages/Dashboard/category/AddSubCategory";
import Overview from "../Pages/CompanyDashboard/Overview";
import AddOrEditProduct from "../Pages/Dashboard/Product/AddOrEditProduct";
import CompanyOrderPage from "../Pages/Dashboard/CompanyOrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    // element: <Main />,
    children: [
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/company/details/:id",
        element: <User />,
      },
      {
        path: "/employee/details/:id",
        element: <EmployeeProfile />,
      },

      {
        path: "/addSubCategory",
        element: <AddSubCategory />,
      },
      {
        path: "/addCategory",
        element: <AddCategory />,
      },

      {
        path: "/addAdmin",
        element: <Admin />,
      },

      {
        path: "/overview",
        element: <Overview />,
      },

      {
        path: "/addProduct",
        element: <AddOrEditProduct />,
      },
      {
        path: "/product/:id",
        element: <AddOrEditProduct />,
      },
      {
        path: "/productList",
        element: <ProductList />,
      },

      {
        path: "/personal-information",
        element: <UserProfile />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/cancellation",
        element: <Cancellation />,
      },
      {
        path: "f-a-q",
        element: <Faq />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },

      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "/company-orders",
        element: <CompanyOrderPage />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsAndCondition />,
      },

      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "/profile",
        element: <AdminProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
