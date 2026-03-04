const EditBlogArticle = ({
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  isTextArea = false,
}) => {
  return isTextArea ? (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="w-full bg-transparent outline-none text-dark-gray font-normal text-sm border-b border-crimson/20 focus:border-crimson transition-all py-1 resize-none leading-relaxed"
    />
  ) : (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-transparent outline-none text-dark-gray font-semibold text-sm border-b border-crimson/20 focus:border-crimson transition-all py-1"
    />
  );
};
export default EditBlogArticle;
