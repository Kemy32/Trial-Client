import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./components/forms/LoginForm.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
// import NotFound from "./pages/NotFound.jsx";

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
        <Route path="/" element={<h1>Home</h1>} />
        {/* Authentication pages */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<h1>Register</h1>} />

        <Route path="/booking" element={<h1>Booking</h1>} />
        <Route path="/menu" element={<h1>Menu</h1>} />
        <Route path="/blogs-articles" element={<h1>Blogs & Articles</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />

        <Route path="/admin-panel" element={<h1>Admin</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>}></Route>

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        {/* Not Found */}
        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Routes>
    </>
  );
}

export default App;
