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

const router = createBrowserRouter([
  {
    path: "/",
    // element: <ProtectedRoute><Main /></ProtectedRoute> ,
    element: (
      // <PrivateRoute>
      <Main />
      // </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/add-banner",
        element: <AddBanners />,
      },
      {
        path: "/banners",
        element: <Banners />,
      },
      {
        path: "/update-banner/:id",
        element: <EditBanners />,
      },
      {
        path: "/company/details/:id",
        element: <User />,
      },
      {
        path: "/barber/profile/:id",
        element: <Vendor />,
      },

      {
        path: "/customers",
        element: <Users />,
      },
      {
        path: "/vendors",
        element: <Vendors />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/salon-category",
        element: <Category />,
      },
      {
        path: "/sub-category",
        element: <SubCategory />,
      },
      {
        path: "/our-transactions",
        element: <OurTransactions />,
      },

      // {
      //   path: "/promotion",
      //   element: <Promotion />,
      // },
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
        path: "offer-list",
        element: <OfferList />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },

      // {
      //   path: "/subscription",
      //   element: <Subscription />,
      // },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsAndCondition />,
      },
      // {
      //   path: "/edit-terms-and-conditions",
      //   element: <TermsAndCondition />,
      // },
      // {
      //   path: "/press",
      //   element: <Press />,
      // },

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
