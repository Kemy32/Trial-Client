import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Mail,
  MessageSquare,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import {
  getAllMessages,
  deleteMessage,
  clearMessage,
  clearError,
} from "../../redux/slices/contactSlice";
import { toast } from "react-toastify";

// Sub-component to handle the expandable message body
const ExpandableMessage = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100; // Character limit before showing "Show More"

  if (!text) return null;

  const shouldShowButton = text.length > maxLength;
  const displayText = isExpanded ? text : `${text.substring(0, maxLength)}...`;

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-gray-600 wrap-break-word whitespace-pre-wrap">
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

export default function MessagesSection() {
  const dispatch = useDispatch();
  const { messages, isLoading, error, message } = useSelector(
    (state) => state.contact,
  );

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "contact-error",
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: import.meta.env.VITE_TOAST_AUTO_CLOSE_ERROR,
      });
      dispatch(clearError());
    }
    if (message) {
      toast.success(message, {
        toastId: "contact-success",
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: import.meta.env.VITE_TOAST_AUTO_CLOSE_MESSAGE,
      });
      dispatch(clearMessage());
    }
  }, [error, message, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      dispatch(deleteMessage(id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto mb-16 p-8 bg-white rounded-lg shadow-md border border-light-coffee">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b border-light-coffee pb-4 mb-6">
        <h1 className="text-2xl font-bold text-crimson">Contact Messages</h1>
        <span className="bg-light-coffee px-4 py-1 rounded-full text-crimson font-semibold text-sm">
          Total: {messages?.length || 0}
        </span>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        <div
          className="overflow-y-auto pr-2 max-h-[600px] custom-scrollbar"
          style={{
            scrollbarWidth: "auto",
            scrollbarColor: `var(--color-crimson) var(--color-light-coffee)`,
          }}
        >
          <table className="w-full border-separate border-spacing-y-3">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-left text-gray-500 uppercase text-xs tracking-wider">
                <th className="px-4 py-2 bg-white">Sender Information</th>
                <th className="px-4 py-2 bg-white">Message Content</th>
                <th className="px-4 py-2 text-center bg-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages && messages.length > 0 ? (
                messages.map((msg) => (
                  <tr key={msg._id} className="group align-top">
                    {/* Sender Info Cell */}
                    <td className="bg-light-coffee p-4 rounded-l-2xl border-y border-l border-transparent group-hover:border-crimson/20 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full text-crimson shadow-sm shrink-0">
                          <User size={18} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-dark-gray leading-tight truncate">
                            {msg.name}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-gray-500 truncate">
                            <Mail size={12} /> {msg.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Message Content Cell */}
                    <td className="bg-light-coffee p-4 border-y border-transparent group-hover:border-crimson/20 transition-all">
                      <div className="flex flex-col gap-2 max-w-xl">
                        <div className="flex items-center gap-2 text-sm font-bold text-dark-gray">
                          <MessageSquare
                            size={14}
                            className="text-crimson shrink-0"
                          />
                          <span className="uppercase tracking-tight underline decoration-crimson/20">
                            {msg.subject || "No Subject"}
                          </span>
                        </div>
                        {/* Custom Expandable Logic */}
                        <ExpandableMessage text={msg.body} />
                      </div>
                    </td>

                    {/* Action Cell */}
                    <td className="bg-light-coffee p-4 rounded-r-2xl text-center border-y border-r border-transparent group-hover:border-crimson/20 transition-all">
                      <div className="flex items-center justify-center pt-2">
                        <button
                          onClick={() => handleDelete(msg._id)}
                          className="flex items-center gap-2 px-4 py-2 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm border border-transparent hover:border-red-600 font-medium text-xs"
                          title="Delete Message"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-10 text-gray-400 italic"
                  >
                    No messages found.
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
