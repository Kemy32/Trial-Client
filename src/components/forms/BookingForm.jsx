import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import {
  clearError,
  clearMessage,
  createBooking,
} from "../../redux/slices/bookingSlice";
import { bookingSchema } from "../../validationSchema/bookingSchema";

export default function BookingForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, message } = useSelector((state) => state.booking);

  const { isLoading: authLoading, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const initialValues = {
    name: "",
    phone: "",
    date: "",
    time: "",
    totalPersons: "",
  };

  // Only redirect if auth check is complete AND user is not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Show toast notifications when error or message changes
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: Number(import.meta.env.VITE_TOAST_AUTO_CLOSE_ERROR),
      });
      // Clear error after showing
      dispatch(clearError());
    }

    if (message) {
      toast.success(message, {
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: Number(import.meta.env.VITE_TOAST_AUTO_CLOSE_MESSAGE),
      });
      // Clear message after showing
      dispatch(clearMessage());
    }
  }, [error, message, dispatch]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const resultAction = await dispatch(createBooking(values));
    // Redirect on success
    if (createBooking.fulfilled.match(resultAction)) {
      navigate("/");
    }
    setSubmitting(false);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-2xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
      <Formik
        initialValues={initialValues}
        validationSchema={bookingSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-6">
            {/* Date and Time  */}
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Date Field */}
              <div className="w-full sm:w-1/2 flex flex-col gap-0.5">
                <label
                  className="font-semibold text-sm text-dark-gray mb-1.5"
                  htmlFor="date"
                >
                  Date
                </label>
                <Field
                  type="date"
                  name="date"
                  id="date"
                  // to set min date to today
                  min={today}
                  className={`appearance-none rounded-full relative block w-full px-3 py-3 bg-white border-grayish border-2 placeholder-grayish  text-dark-gray  focus:outline-none focus:ring-mid-gray focus:border-mid-gray focus:z-10 sm:text-sm ${
                    errors.date && touched.date
                      ? "outline-1 outline-mid-red border-mid-red"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-crimson mt-0.5 text-xs"
                />
              </div>
              {/* Time Field */}
              <div className="w-full sm:w-1/2 flex flex-col gap-0.5">
                <label
                  className="font-semibold text-sm text-dark-gray mb-1.5"
                  htmlFor="time"
                >
                  Time
                </label>

                <Field
                  type="time"
                  name="time"
                  id="time"
                  className={`appearance-none rounded-full relative block w-full px-3 py-3 bg-white border-grayish border-2 placeholder-grayish  text-dark-gray  focus:outline-none focus:ring-mid-gray focus:border-mid-gray focus:z-10 sm:text-sm ${
                    errors.time && touched.time
                      ? "outline-1 outline-mid-red border-mid-red"
                      : ""
                  }`}
                />

                <ErrorMessage
                  name="time"
                  component="div"
                  className="text-crimson mt-0.5 text-xs"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              {/* Name Field */}
              <div className="w-full sm:w-1/2 flex flex-col gap-0.5">
                <label
                  className="font-semibold text-sm text-dark-gray mb-1.5"
                  htmlFor="name"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  className={`appearance-none rounded-full relative block w-full px-3 py-3 bg-white border-grayish border-2 placeholder-grayish  text-dark-gray  focus:outline-none focus:ring-mid-gray focus:border-mid-gray focus:z-10 sm:text-sm ${
                    errors.name && touched.name
                      ? "outline-1 outline-mid-red border-mid-red"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-crimson mt-0.5 text-xs"
                />
              </div>
              {/* Phone Field */}
              <div className="w-full sm:w-1/2 flex flex-col gap-0.5">
                <label
                  className="font-semibold text-sm text-dark-gray mb-1.5"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <Field
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="123-456-7890"
                  className={`appearance-none rounded-full relative block w-full px-3 py-3 bg-white border-grayish border-2 placeholder-grayish  text-dark-gray  focus:outline-none focus:ring-mid-gray focus:border-mid-gray focus:z-10 sm:text-sm ${
                    errors.phone && touched.phone
                      ? "outline-1 outline-mid-red border-mid-red"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-crimson mt-0.5 text-xs"
                />
              </div>
            </div>
            {/* Total Persons Field */}
            <div className="w-full flex flex-col gap-0.5">
              <label
                className="font-semibold text-sm text-dark-gray mb-1.5"
                htmlFor="totalPersons"
              >
                Total Persons
              </label>
              <Field
                type="number"
                name="totalPersons"
                id="totalPersons"
                placeholder="1"
                min="1"
                max="12"
                className={`appearance-none rounded-full relative block w-full px-3 py-3 bg-white border-grayish border-2 placeholder-grayish  text-dark-gray  focus:outline-none focus:ring-mid-gray focus:border-mid-gray focus:z-10 sm:text-sm ${
                  errors.totalPersons && touched.totalPersons
                    ? "outline-1 outline-mid-red border-mid-red"
                    : ""
                }`}
              />
              <ErrorMessage
                name="totalPersons"
                component="div"
                className="text-crimson mt-0.5 text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-crimson hover:bg-coffee hover:text-crimson disabled:bg-crimson disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex flex-row">
                  <span className="spinner"></span>
                  Booking...
                </div>
              ) : (
                "Book a table"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
