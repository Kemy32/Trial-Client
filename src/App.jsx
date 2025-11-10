import { Routes, Route } from "react-router-dom";
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

function App() {
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

        {/* Protected Routes for Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-panel" element={<AdminPanel />} />
        </Route>

        {/* Protected Routes for User */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/booking" element={<Booking />} />
          <Route path="/profile" element={<UserProfile />}></Route>
          <Route path="/my-bookings" element={<MyBookings />}></Route>
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
