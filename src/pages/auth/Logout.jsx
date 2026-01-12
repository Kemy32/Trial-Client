import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, clearMessage, logout } from "../../redux/slices/authSlice"; // Import your Redux thunk
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    if (hasLoggedOut.current) return; // Already logged out,
    hasLoggedOut.current = true; // Mark as logged out

    const performLogout = async () => {
      try {
        const result = await dispatch(logout()).unwrap();
        const isLoggedOut = result.isLoggedOut;
        const loggedOutMessage = result.loggedOutMessage;

        if (loggedOutMessage && isLoggedOut) {
          toast.success(loggedOutMessage, {
            position: "top-center",
            autoClose: 5000,
          });
        }
        setTimeout(() => navigate("/"), 100);
      } catch (error) {
        const errorMessage =
          typeof error === "string" ? error : error.message || "Logout failed";
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/");
      } finally {
        dispatch(clearMessage());
        dispatch(clearError());
      }
    };

    performLogout();
  }, [dispatch, navigate]);

  return (
    <div>
      <LoadingSpinner />
    </div>
  );
}
