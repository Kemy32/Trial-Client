import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, clearMessage, logout } from "../../redux/slices/authSlice"; // Import your Redux thunk
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, message, error, isLoggedOut } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && isLoggedOut) {
      toast.success(message);
      dispatch(clearMessage());
      navigate("/");
    } else if (error) {
      toast.error(error);
      dispatch(clearError());

      navigate("/");
    }
  }, [isLoading, isLoggedOut, message, error, navigate, dispatch]);
  return (
    <div>
      <LoadingSpinner />
    </div>
  );
}
