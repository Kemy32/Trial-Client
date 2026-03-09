const EditField = ({
  label,
  name,
  value,
  icon,
  isEditing,
  onChange,
  type = "text",
  isPassword = false,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-left text-gray-500 uppercase text-xs tracking-wider font-semibold ml-1">
        {label}
      </label>
      <div
        className={`flex items-center gap-4 p-4 rounded-2xl transition-all h-16 border ${
          isEditing
            ? "bg-white border-crimson/30 shadow-sm"
            : "bg-light-coffee border-transparent"
        }`}
      >
        <div className="bg-white p-2.5 rounded-full text-crimson shadow-sm flex items-center justify-center shrink-0">
          {icon}
        </div>

        {isEditing ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={isPassword ? "••••••••" : ""}
            className="w-full bg-transparent outline-none text-dark-gray font-semibold text-sm"
          />
        ) : (
          <span className="font-semibold text-dark-gray text-sm truncate">
            {isPassword ? "••••••••••••" : value || "Not provided"}
          </span>
        )}
      </div>
      {isEditing && isPassword && (
        <p className="text-[10px] text-gray-400 italic ml-2 mt-1">
          Leave blank to keep current password
        </p>
      )}
    </div>
  );
};

export default EditField;
