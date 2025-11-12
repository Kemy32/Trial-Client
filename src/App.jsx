import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/slices/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import HeaderBar from "./components/layout/HeaderBar.jsx";
import Footer from "./components/layout/Footer.jsx";

import Home from "./pages/content/Home.jsx";

import Menu from "./pages/content/Menu.jsx";
import BlogArticle from "./pages/content/BlogArticle.jsx";
import Contact from "./pages/content/Contact.jsx";
import About from "./pages/content/About.jsx";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages//auth/Register.jsx";
import VerifyOtp from "./pages//auth/VerifyOtp.jsx";

import AdminPanel from "./pages/admin/AdminPanel.jsx";

import Booking from "./pages/service/Booking.jsx";
import UserProfile from "./pages/user/UserProfile.jsx";
import MyBookings from "./pages/user/MyBookings.jsx";

import Unauthorized from "./pages/auth/Unauthorized.jsx";
import NotFound from "./pages/errors/NotFound.jsx";
import Logout from "./pages/auth/Logout.jsx";

function App() {
  const dispatch = useDispatch();

  // Check if user is logged in on app load
  // Needed for actions that require authentication on app load
  // To avoid redirecting the user (whose already logged in) to the login page
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <HeaderBar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        {/* Authentication pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="/menu" element={<Menu />} />
        <Route path="/blogs-articles" element={<BlogArticle />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Will be under protected routes */}
        {/* Used here just for testing */}
        <Route path="/logout" element={<Logout />}></Route>

        {/* Protected Routes for Admin and User */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "user"]} />}>
          <Route path="/booking" element={<Booking />} />
        </Route>

        {/* Protected Routes for Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/admin-panel" element={<AdminPanel />} />
          <Route path="/admin/profile" element={<UserProfile />}></Route>
          <Route path="/admin/users" element={<h1>Users List</h1>}></Route>
          <Route path="/admin/bookings" element={<Booking />} />
        </Route>

        {/* Protected Routes for User */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user/profile" element={<UserProfile />}></Route>
          <Route path="/user/my-bookings" element={<MyBookings />}></Route>
        </Route>

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        {/* Not Found */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
