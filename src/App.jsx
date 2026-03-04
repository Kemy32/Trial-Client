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

import AdminProfile from "./pages/admin/AdminProfile.jsx";
import AdminUsers from "./pages/admin/Users.jsx";
import AdminBookings from "./pages/admin/Bookings.jsx";
import AdminMenu from "./pages/admin/Menu.jsx";
import AdminBlogsArticles from "./pages/admin/BlogsArticles.jsx";
import AdminMessages from "./pages/admin/ContactMessages.jsx";

import Booking from "./pages/service/Booking.jsx";
import UserProfile from "./pages/user/UserProfile.jsx";
import MyBookings from "./pages/user/MyBookings.jsx";

import Unauthorized from "./pages/auth/Unauthorized.jsx";
import NotFound from "./pages/errors/NotFound.jsx";
import Logout from "./pages/auth/Logout.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";

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
      <Navbar />

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
          <Route element={<DashboardLayout />}>
            <Route path="/admin/my-profile" element={<AdminProfile />}></Route>
            <Route path="/admin/users" element={<AdminUsers />}></Route>
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/menu" element={<AdminMenu />}></Route>
            <Route path="/admin/blogs" element={<AdminBlogsArticles />}></Route>
            <Route path="/admin/contacts" element={<AdminMessages />}></Route>
          </Route>
        </Route>

        {/* Protected Routes for User */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/user/my-profile" element={<UserProfile />}></Route>
            <Route path="/user/my-bookings" element={<MyBookings />}></Route>
            <Route
              path="/user/notifications"
              element={<h1>Notifications</h1>}
            ></Route>
          </Route>
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
