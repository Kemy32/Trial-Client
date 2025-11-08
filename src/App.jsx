import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages//auth/Register.jsx";
import VerifyOtp from "./pages//auth/VerifyOtp.jsx";

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
      <Routes>
        {/* Home */}
        <Route path="/" element={<h1>Home Page</h1>} />
        {/* Authentication pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="/menu" element={<h1>Menu</h1>} />
        <Route path="/blogs-articles" element={<h1>Blogs & Articles</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />

        <Route path="/admin-panel" element={<h1>Admin</h1>} />

        <Route path="/profile" element={<h1>User Profile</h1>}></Route>
        <Route path="/my-bookings" element={<h1>My Bookings</h1>}></Route>
        <Route path="/booking" element={<h1>Booking</h1>} />

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        {/* Not Found */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
