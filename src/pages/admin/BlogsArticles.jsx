import { useEffect, useState } from "react";
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
} from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import {
  getAllBlogsArticles,
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
      setEditingId(null); // Exit edit mode on success
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
    <div className="max-w-5xl mx-auto mb-16 p-8 bg-white rounded-lg shadow-md border border-light-coffee">
      <div className="flex justify-between items-center border-b border-light-coffee pb-4 mb-6">
        <h1 className="text-2xl font-bold text-crimson">Blogs & Articles</h1>
        <span className="bg-light-coffee px-4 py-1 rounded-full text-crimson font-semibold text-sm">
          Total: {blogsArticles?.length || 0}
        </span>
      </div>

      {isLoading && !editingId ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="overflow-y-auto pr-2 max-h-[700px] custom-scrollbar">
          <table className="w-full border-separate border-spacing-y-4">
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
