import { useState } from "react";
import { User, Mail, Phone, MapPin, Edit3, Save, X, Lock } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
// Import your update thunk/action here
// import { updateProfile } from "../../redux/slices/authSlice";

const AdminProfile = () => {
  const { user } = useSelector((state) => state.auth);
  //   const dispatch = useDispatch();

  // State to toggle modes
  const [isEditing, setIsEditing] = useState(false);

  // Local state for the form
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    password: "CANNOT BE DISPLAYED (HASHED)",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Call your backend API here via Redux dispatch
    // const result = await dispatch(updateProfile(formData));
    // if (result.success) setIsEditing(false);
    console.log("Saving data:", formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto  p-8 bg-white rounded-lg shadow-md border border-light-coffee">
      <div className="flex justify-between items-center mb-8 border-b border-light-coffee pb-4">
        <h1 className="text-2xl font-bold text-crimson">Admin Information</h1>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-crimson text-white px-5 py-2 rounded-full hover:bg-opacity-90 transition-all shadow-md"
          >
            <Edit3 size={18} /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 bg-gray-200 text-dark-gray px-5 py-2 rounded-full hover:bg-gray-300 transition-all"
            >
              <X size={18} /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition-all shadow-md"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Detail Item */}
        <DetailItem
          label="Full Name"
          name="name"
          value={formData.name}
          icon={<User className="text-crimson" />}
          isEditing={isEditing}
          onChange={handleChange}
        />
        <DetailItem
          label="Email Address"
          name="email"
          value={formData.email}
          icon={<Mail className="text-crimson" />}
          isEditing={isEditing}
          onChange={handleChange}
          type="email"
        />
        <DetailItem
          label="Phone Number"
          name="phone"
          value={formData.phone}
          icon={<Phone className="text-crimson" />}
          isEditing={isEditing}
          onChange={handleChange}
        />
        <DetailItem
          label="Password"
          name="password"
          value={formData.password}
          icon={<Lock className="text-crimson" />}
          isEditing={isEditing}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

// Detail Item Component
const DetailItem = ({
  label,
  name,
  value,
  icon,
  isEditing,
  onChange,
  type = "text",
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <div
        className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
          isEditing ? "bg-white border-2 border-crimson/30" : "bg-light-coffee"
        }`}
      >
        {icon}
        {isEditing ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent outline-none text-dark-gray font-medium"
            autoFocus={name === "name"}
          />
        ) : (
          <span className="text-dark-gray font-medium">
            {value || "Not provided"}
          </span>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
