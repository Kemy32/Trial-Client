import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import EditMenu from "../../components/forms/EditMenuFrom.jsx";
import {
  Pencil,
  Trash2,
  UtensilsCrossed,
  Tag,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Save,
  X,
} from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import {
  getAllMenuItems,
  deleteMenuItem,
  updateMenuItem,
  clearError,
  clearMessage,
} from "../../redux/slices/menuSlice";

const ExpandableDescription = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 80;
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
              <ChevronUp size={12} /> <span>Show Less</span>
            </>
          ) : (
            <>
              <ChevronDown size={12} /> <span>Show More</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default function MenuItemsSection() {
  const dispatch = useDispatch();
  const { menuItems, isLoading, error, message } = useSelector(
    (state) => state.menu,
  );

  // Editing State
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getAllMenuItems());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "menu-error",
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: Number(import.meta.env.VITE_TOAST_AUTO_CLOSE_ERROR),
      });
      dispatch(clearError());
    }
    if (message) {
      toast.success(message, {
        toastId: "menu-success",
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: Number(import.meta.env.VITE_TOAST_AUTO_CLOSE_MESSAGE),
      });
      dispatch(clearMessage());
      setEditingId(null); // Exit edit mode on success
    }
  }, [error, message, dispatch]);

  const handleStartEdit = (item) => {
    setEditingId(item._id);
    setEditFormData({
      title: item.title,
      price: item.price,
      category: item.category,
      description: item.description,
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSave = (id) => {
    dispatch(updateMenuItem({ id, menuItemData: editFormData }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      dispatch(deleteMenuItem(id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto mb-16 p-8 bg-white rounded-lg shadow-md border border-light-coffee">
      <div className="flex justify-between items-center border-b border-light-coffee pb-4 mb-6">
        <h1 className="text-2xl font-bold text-crimson">Menu Management</h1>
        <span className="bg-light-coffee px-4 py-1 rounded-full text-crimson font-semibold text-sm">
          Total Items: {menuItems?.length || 0}
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
                <th className="px-4 py-2 bg-white">Dish Details</th>
                <th className="px-4 py-2 bg-white">Description & Category</th>
                <th className="px-4 py-2 text-center bg-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems?.length > 0 ? (
                menuItems.map((item) => {
                  const isEditing = editingId === item._id;
                  return (
                    <tr key={item._id} className="group align-top">
                      {/* Dish Details Cell */}
                      <td
                        className={`p-4 rounded-l-2xl border-y border-l transition-all w-1/3 ${isEditing ? "bg-white border-crimson/30 shadow-sm" : "bg-light-coffee border-transparent"}`}
                      >
                        <div className="flex gap-4">
                          <img
                            src={item.image || "/placeholder-food.jpg"}
                            className="w-20 h-20 object-cover rounded-lg shadow-sm shrink-0"
                          />
                          <div className="flex flex-col justify-center w-full gap-2">
                            {isEditing ? (
                              <>
                                <EditMenu
                                  name="title"
                                  value={editFormData.title}
                                  onChange={handleEditChange}
                                  placeholder="Dish Title"
                                />
                                <div className="flex items-center gap-1 text-crimson">
                                  <DollarSign size={14} />
                                  <EditMenu
                                    name="price"
                                    type="number"
                                    value={editFormData.price}
                                    onChange={handleEditChange}
                                    placeholder="0.00"
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <h3 className="font-bold text-dark-gray truncate">
                                  {item.title}
                                </h3>
                                <div className="flex items-center gap-1 text-crimson font-bold text-sm">
                                  <DollarSign size={14} />
                                  <span>
                                    {parseFloat(item.price).toFixed(2)}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Description & Category Cell */}
                      <td
                        className={`p-4 border-y transition-all ${isEditing ? "bg-white border-crimson/30" : "bg-light-coffee border-transparent"}`}
                      >
                        <div className="flex flex-col gap-2">
                          {isEditing ? (
                            <>
                              <div className="flex items-center gap-2">
                                <Tag size={12} className="text-crimson" />
                                <EditMenu
                                  name="category"
                                  value={editFormData.category}
                                  onChange={handleEditChange}
                                  placeholder="Category"
                                />
                              </div>
                              <EditMenu
                                name="description"
                                value={editFormData.description}
                                onChange={handleEditChange}
                                placeholder="Description"
                                isTextArea={true}
                              />
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-2 text-[10px] font-black text-crimson uppercase tracking-widest">
                                <Tag size={12} />
                                <span className="bg-white px-2 py-0.5 rounded border border-crimson/10">
                                  {item.category}
                                </span>
                              </div>
                              <div className="flex items-start gap-2">
                                <UtensilsCrossed
                                  size={14}
                                  className="text-gray-400 mt-1 shrink-0"
                                />
                                <ExpandableDescription
                                  text={item.description}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Actions Cell */}
                      <td
                        className={`p-4 rounded-r-2xl text-center border-y border-r transition-all w-48 ${isEditing ? "bg-white border-crimson/30" : "bg-light-coffee border-transparent"}`}
                      >
                        <div className="flex flex-col items-center justify-center gap-3 h-full">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleSave(item._id)}
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
                                onClick={() => handleStartEdit(item)}
                                className="flex items-center justify-center gap-2 w-32 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-transparent hover:border-blue-700 font-bold text-[10px] uppercase"
                              >
                                <Pencil size={14} /> Edit Item
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
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
                    The menu is currently empty.
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
