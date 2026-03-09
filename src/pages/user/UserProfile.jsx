import { useEffect, useState } from "react";
import { User, Mail, Phone, Edit3, Save, X, Lock } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import EditField from "../../components/forms/EditProfileForm.jsx";
import {
  updateUserProfile,
  clearError,
  clearMessage,
} from "../../redux/slices/userSlice";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, error, message } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "user-profile-error",
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: Number(import.meta.env.VITE_TOAST_AUTO_CLOSE_ERROR),
      });
      dispatch(clearError());
    }
    if (message) {
      toast.success(message, {
        toastId: "user-profile-success",
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: Number(import.meta.env.VITE_TOAST_AUTO_CLOSE_MESSAGE),
      });
      dispatch(clearMessage());
      setIsEditing(false);
    }
  }, [error, message, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updateData = { ...formData };
    if (!updateData.password || updateData.password.trim() === "") {
      delete updateData.password;
    }
    setIsEditing(false);
    dispatch(updateUserProfile(updateData));
  };

  return (
    <div className="max-w-5xl mx-auto mb-16 p-8 bg-white rounded-lg shadow-md border border-light-coffee">
      <div className="flex justify-between items-center border-b border-light-coffee pb-4 mb-8">
        <h1 className="text-2xl font-bold text-crimson">User Information</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-crimson text-white px-5 py-2 rounded-full hover:bg-opacity-90 transition-all shadow-md font-bold text-sm"
          >
            <Edit3 size={18} /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 bg-gray-200 text-dark-gray px-5 py-2 rounded-full hover:bg-gray-300 transition-all font-bold text-sm"
            >
              <X size={18} /> Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition-all shadow-md font-bold text-sm disabled:bg-gray-400"
            >
              {isLoading ? <LoadingSpinner size="sm" /> : <Save size={18} />}
              <span>{isLoading ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <EditField
          label="Full Name"
          name="name"
          value={formData.name}
          icon={<User size={18} />}
          isEditing={isEditing}
          onChange={handleChange}
        />
        <EditField
          label="Email Address"
          name="email"
          value={formData.email}
          icon={<Mail size={18} />}
          isEditing={isEditing}
          onChange={handleChange}
          type="email"
        />
        <EditField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          icon={<Phone size={18} />}
          isEditing={isEditing}
          onChange={handleChange}
        />
        <EditField
          label="Password"
          name="password"
          value={formData.password}
          icon={<Lock size={18} />}
          isEditing={isEditing}
          onChange={handleChange}
          type="password"
          isPassword={true}
        />
      </div>
    </div>
  );
}
