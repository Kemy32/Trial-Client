import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, Mail, Phone, Trash2 } from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import {
  getAllUsers,
  deleteUserById,
  clearMessage,
  clearError,
} from "../../redux/slices/userSlice";
import { toast } from "react-toastify";

export default function UsersSection() {
  const dispatch = useDispatch();
  const { users, isLoading, error, message } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "users-error",
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: import.meta.env.VITE_TOAST_AUTO_CLOSE_ERROR,
      });
      dispatch(clearError());
    }
    if (message) {
      toast.success(message, {
        toastId: "users-success",
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: import.meta.env.VITE_TOAST_AUTO_CLOSE_MESSAGE,
      });
      dispatch(clearMessage());
    }
  }, [error, message, dispatch]);

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      dispatch(deleteUserById(id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto mb-16 p-8 bg-white rounded-lg shadow-md border border-light-coffee">
      {/* Header Section */}
      <div className="flex justify-between items-center  border-b border-light-coffee pb-4 mb-6">
        <h1 className="text-2xl font-bold text-crimson">Platform Users</h1>
        <span className="bg-light-coffee px-4 py-1 rounded-full text-crimson font-semibold text-sm">
          Total: {users?.length || 0}
        </span>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        /* Scrollable Container */
        <div
          className="overflow-y-auto pr-2 max-h-[480px] custom-scrollbar"
          style={{
            scrollbarWidth: "auto",
            scrollbarColor: `var(--color-crimson) var(--color-light-coffee)`,
          }}
        >
          <table className="w-full border-separate border-spacing-y-3">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-left text-gray-500 uppercase text-xs tracking-wider">
                <th className="px-4 py-2 bg-white">User name</th>
                <th className="px-4 py-2 bg-white">Contact</th>
                <th className="px-4 py-2 text-center bg-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="group">
                    {/* Name Cell */}
                    <td className="bg-light-coffee p-4 rounded-l-2xl border-y border-l border-transparent group-hover:border-crimson/20 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full text-crimson shadow-sm">
                          <User size={18} />
                        </div>
                        <span className="font-semibold text-dark-gray">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    {/* Contact Cell */}
                    <td className="bg-light-coffee p-4 border-y border-transparent group-hover:border-crimson/20 transition-all">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={14} className="text-crimson" />{" "}
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={14} className="text-crimson" />{" "}
                          {user.phone || "No phone"}
                        </div>
                      </div>
                    </td>

                    {/* Actions Cell */}
                    <td className="bg-light-coffee p-4 rounded-r-2xl text-center border-y border-r border-transparent group-hover:border-crimson/20 transition-all">
                      <button
                        onClick={() => handleDelete(user._id, user.name)}
                        className="flex items-center gap-1 p-2 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-10 text-gray-400 italic"
                  >
                    No users available to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
