import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import EditBlogArticle from "../../components/forms/EditBlogArticleForm.jsx";
import {
  Pencil,
  Trash2,
  Calendar,
  BookOpenText,
  ChevronDown,
  ChevronUp,
  Save,
  X,
  Plus,
  ImagePlus,
} from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import {
  getAllBlogsArticles,
  createBlogArticle,
  updateBlogArticle,
  deleteBlogArticle,
  clearError,
  clearMessage,
} from "../../redux/slices/blogSlice";

const ExpandableContent = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  if (!text) return null;

  const shouldShowButton = text.length > maxLength;
  const displayText = isExpanded ? text : `${text.substring(0, maxLength)}...`;

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-gray-600 wrap-break-word whitespace-pre-wrap leading-relaxed">
        {shouldShowButton ? displayText : text}
      </p>
      {shouldShowButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-crimson font-bold text-[10px] uppercase hover:underline mt-1 w-fit"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={12} />
              <span>Show Less</span>
            </>
          ) : (
            <>
              <ChevronDown size={12} />
              <span>Show More</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

const emptyCreateForm = {
  title: "",
  content: "",
  image: null,
};

export default function BlogsArticlesSection() {
  const dispatch = useDispatch();
  const { blogsArticles, isLoading, error, message } = useSelector(
    (state) => state.blog,
  );

  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    content: "",
  });

  // Create-article drawer state
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);
  const [createFormData, setCreateFormData] = useState(emptyCreateForm);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleCreateChange = (e) => {
    setCreateFormData({ ...createFormData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCreateFormData({ ...createFormData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!createFormData.title || !createFormData.content) {
      toast.error("Please fill in all required fields.", {
        toastId: "create-blog-validation",
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: Number(import.meta.env.VITE_TOAST_AUTO_CLOSE_ERROR),
      });
      return;
    }
    dispatch(createBlogArticle(createFormData));
  };

  const closeCreateDrawer = () => {
    setShowCreateDrawer(false);
    setCreateFormData(emptyCreateForm);
    setImagePreview(null);
  };

  useEffect(() => {
    dispatch(getAllBlogsArticles());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "blogs-error",
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: Number(import.meta.env.VITE_TOAST_AUTO_CLOSE_ERROR),
      });
      dispatch(clearError());
    }
    if (message) {
      toast.success(message, {
        toastId: "blogs-success",
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: Number(import.meta.env.VITE_TOAST_AUTO_CLOSE_MESSAGE),
      });
      dispatch(clearMessage());
      setEditingId(null);
      closeCreateDrawer(); // Close drawer after successful create
    }
  }, [error, message, dispatch]);

  const handleStartEdit = (article) => {
    setEditingId(article._id);
    setEditFormData({
      title: article.title,
      content: article.content,
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSave = (id) => {
    dispatch(updateBlogArticle({ id, blogData: editFormData }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      dispatch(deleteBlogArticle(id));
    }
  };

  const cleanDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-5xl mx-auto mb-16 p-4 md:p-8 bg-white rounded-lg shadow-md border border-light-coffee">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-light-coffee pb-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-crimson italic font-heading">
          Blogs & Articles
        </h1>
        <div className="flex items-center gap-3">
          <span className="bg-light-coffee px-4 py-1 rounded-full text-crimson font-semibold text-sm">
            Total: {blogsArticles?.length || 0}
          </span>
          <button
            onClick={() => setShowCreateDrawer(true)}
            className="flex items-center gap-2 px-4 py-2 bg-crimson text-white rounded-full hover:bg-red-800 transition-all shadow-sm font-bold text-xs uppercase"
          >
            <Plus size={14} /> New Article
          </button>
        </div>
      </div>

      {/* ── Add New Article Drawer ── */}
      {showCreateDrawer && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={closeCreateDrawer}
          />
          {/* Panel */}
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-y-auto animate-slide-in">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-light-coffee">
              <div>
                <h2 className="text-xl font-bold text-crimson">New Article</h2>
                <p className="text-xs text-gray-400 mt-0.5">Fill in the details below</p>
              </div>
              <button
                onClick={closeCreateDrawer}
                className="p-2 rounded-full hover:bg-light-coffee transition-all text-gray-400 hover:text-crimson"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateSubmit} className="flex flex-col gap-5 p-6 flex-1">

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Cover Photo (optional)
                </label>
                <div
                  className="w-full h-40 rounded-xl border-2 border-dashed border-crimson/20 hover:border-crimson/50 transition-all flex flex-col items-center justify-center cursor-pointer bg-light-coffee/40 overflow-hidden"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <ImagePlus size={28} className="text-crimson/40 mb-2" />
                      <span className="text-xs text-gray-400">Click to upload cover image</span>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Title *
                </label>
                <input
                  name="title"
                  value={createFormData.title}
                  onChange={handleCreateChange}
                  placeholder="e.g. The Art of Italian Cuisine"
                  required
                  maxLength={50}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-dark-gray focus:outline-none focus:border-crimson transition-all"
                />
                <p className="text-[10px] text-gray-400 mt-1 text-right">
                  {createFormData.title.length}/50
                </p>
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={createFormData.content}
                  onChange={handleCreateChange}
                  placeholder="Write your article content here..."
                  rows={6}
                  required
                  maxLength={200}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-dark-gray focus:outline-none focus:border-crimson transition-all resize-none"
                />
                <p className="text-[10px] text-gray-400 mt-1 text-right">
                  {createFormData.content.length}/200
                </p>
              </div>

              {/* Submit */}
              <div className="mt-auto pt-4 border-t border-light-coffee flex gap-3">
                <button
                  type="button"
                  onClick={closeCreateDrawer}
                  className="flex-1 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2.5 rounded-full bg-crimson text-white text-sm font-bold hover:bg-red-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <><span className="spinner" /> Creating...</>
                  ) : (
                    <><Plus size={14} /> Publish Article</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading && !editingId ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="overflow-x-auto overflow-y-auto pr-2 max-h-[700px] custom-scrollbar pb-2">
          <table className="w-full min-w-[900px] border-separate border-spacing-y-4 text-left">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-left text-gray-500 uppercase text-xs tracking-wider">
                <th className="px-4 py-2 bg-white">Article Details</th>
                <th className="px-4 py-2 bg-white">Content Summary</th>
                <th className="px-4 py-2 text-center bg-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogsArticles?.length > 0 ? (
                blogsArticles.map((article) => {
                  const isEditing = editingId === article._id;
                  return (
                    <tr key={article._id} className="group align-top">
                      <td
                        className={`p-4 rounded-l-2xl border-y border-l transition-all w-1/3 ${isEditing ? "bg-white border-crimson/30 shadow-sm" : "bg-light-coffee border-transparent"}`}
                      >
                        <div className="flex gap-4">
                          <img
                            src={article.image || "/placeholder-blog.jpg"}
                            alt={article.title}
                            className="w-24 h-24 object-cover rounded-lg shadow-sm border-2 border-white shrink-0"
                          />
                          <div className="flex flex-col justify-center min-w-0 w-full gap-2">
                            {isEditing ? (
                              <EditBlogArticle
                                name="title"
                                value={editFormData.title}
                                onChange={handleEditChange}
                                placeholder="Article Title"
                              />
                            ) : (
                              <h3 className="font-bold text-dark-gray leading-tight line-clamp-2">
                                {article.title}
                              </h3>
                            )}
                            <div className="flex items-center gap-1 text-[11px] text-gray-500 uppercase font-bold">
                              <Calendar size={12} className="text-crimson" />
                              {cleanDate(article.createdAt || article.date)}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td
                        className={`p-4 border-y transition-all ${isEditing ? "bg-white border-crimson/30" : "bg-light-coffee border-transparent"}`}
                      >
                        <div className="flex flex-col gap-2 max-w-xl">
                          <div className="flex items-center gap-2 text-xs font-bold text-crimson uppercase tracking-widest">
                            <BookOpenText size={14} />
                            <span>Content</span>
                          </div>
                          {isEditing ? (
                            <EditBlogArticle
                              name="content"
                              value={editFormData.content}
                              onChange={handleEditChange}
                              placeholder="Article content..."
                              isTextArea={true}
                            />
                          ) : (
                            <ExpandableContent text={article.content} />
                          )}
                        </div>
                      </td>

                      <td
                        className={`p-4 rounded-r-2xl text-center border-y border-r transition-all w-48 ${isEditing ? "bg-white border-crimson/30" : "bg-light-coffee border-transparent"}`}
                      >
                        <div className="flex flex-col items-center justify-center gap-3 h-full pt-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleSave(article._id)}
                                className="flex items-center justify-center gap-2 w-32 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-md font-bold text-[10px] uppercase"
                              >
                                <Save size={14} /> Save
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="flex items-center justify-center gap-2 w-32 py-2 bg-gray-200 text-dark-gray rounded-full hover:bg-gray-300 font-bold text-[10px] uppercase"
                              >
                                <X size={14} /> Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleStartEdit(article)}
                                className="flex items-center justify-center gap-2 w-32 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-transparent hover:border-blue-700 font-bold text-[10px] uppercase"
                              >
                                <Pencil size={14} /> Edit
                              </button>
                              <button
                                onClick={() => handleDelete(article._id)}
                                className="flex items-center justify-center gap-2 w-32 py-2 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm border border-transparent hover:border-red-600 font-bold text-[10px] uppercase"
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-20 text-gray-400 italic"
                  >
                    No articles found.
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
