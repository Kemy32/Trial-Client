import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, Calendar, Clock, Users, X, Trash2 } from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import {
  getUserBookings,
  cancelBooking,
  deleteUserBooking, // Added this action
  clearMessage,
  clearError,
} from "../../redux/slices/bookingSlice";
import { toast } from "react-toastify";

export default function MyBookingsSection() {
  const dispatch = useDispatch();
  const { bookings, isLoading, error, message } = useSelector(
    (state) => state.booking,
  );

  useEffect(() => {
    dispatch(getUserBookings());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "booking-error",
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: import.meta.env.VITE_TOAST_AUTO_CLOSE_ERROR,
      });
      dispatch(clearError());
    }
    if (message) {
      toast.success(message, {
        toastId: "booking-success",
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: import.meta.env.VITE_TOAST_AUTO_CLOSE_MESSAGE,
      });
      dispatch(clearMessage());
    }
  }, [error, message, dispatch]);

  const cleanDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleCancel = (booking) => {
    if (
      window.confirm(
        `Are you sure you want to cancel your booking for ${cleanDate(booking.date)} at ${booking.time}?`,
      )
    ) {
      dispatch(
        cancelBooking({ bookingId: booking._id, bookingStatus: "cancelled" }),
      );
    }
  };

  const handleDelete = (bookingId) => {
    if (window.confirm("Remove this cancelled booking from your history?")) {
      dispatch(deleteUserBooking(bookingId));
    }
  };

  return (
    <div className="max-w-6xl mx-auto mb-16 p-8 bg-white rounded-lg shadow-md border border-light-coffee">
      <div className="flex justify-between items-center border-b border-light-coffee pb-4 mb-6">
        <h1 className="text-2xl font-bold text-crimson">My Bookings</h1>
        <span className="bg-light-coffee px-4 py-1 rounded-full text-crimson font-semibold text-sm">
          Total: {bookings?.length || 0}
        </span>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
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
                <th className="px-4 py-2 bg-white">Guest Information</th>
                <th className="px-4 py-2 bg-white">Schedule</th>
                <th className="px-4 py-2 text-center bg-white">Actions</th>
                <th className="px-4 py-2 text-center bg-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings && bookings.length > 0 ? (
                bookings.map((booking) => {
                  const isCancelable = booking.status === "pending";
                  const isDeletable =
                    booking.status === "cancelled" ||
                    booking.status === "rejected";

                  return (
                    <tr key={booking._id} className="group">
                      <td className="bg-light-coffee p-4 rounded-l-2xl border-y border-l border-transparent group-hover:border-crimson/20 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="bg-white p-2 rounded-full text-crimson shadow-sm">
                            <User size={18} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-dark-gray leading-tight">
                              {booking.name}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Users size={12} /> {booking.totalPersons} Persons
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="bg-light-coffee p-4 border-y border-transparent group-hover:border-crimson/20 transition-all">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={14} className="text-crimson" />
                            {cleanDate(booking.date)}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                            <Clock size={14} className="text-crimson" />
                            {booking.time}
                          </div>
                        </div>
                      </td>

                      <td className="bg-light-coffee p-4 border-y border-transparent group-hover:border-crimson/20 transition-all">
                        <div className="flex items-center justify-center gap-2">
                          {isCancelable ? (
                            <button
                              onClick={() => handleCancel(booking)}
                              className="flex items-center gap-1 px-3 py-2 rounded-full shadow-sm transition-all font-medium text-xs bg-white text-red-600 hover:bg-red-600 hover:text-white"
                            >
                              <X size={16} />
                              <span>Cancel</span>
                            </button>
                          ) : isDeletable ? (
                            <button
                              onClick={() => handleDelete(booking._id)}
                              className="flex items-center gap-1 px-3 py-2 rounded-full shadow-sm transition-all font-medium text-xs bg-white text-gray-600 hover:bg-crimson hover:text-white border border-transparent hover:border-crimson"
                            >
                              <Trash2 size={16} />
                              <span>Delete</span>
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400 italic">
                              No actions available
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="bg-light-coffee p-4 rounded-r-2xl text-center border-y border-r border-transparent group-hover:border-crimson/20 transition-all">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${
                            booking.status === "approved"
                              ? "bg-green-100 text-green-600"
                              : booking.status === "rejected" ||
                                  booking.status === "cancelled"
                                ? "bg-red-100 text-red-600"
                                : "bg-white text-gray-500"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-400 italic"
                  >
                    No bookings found.
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
