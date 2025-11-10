import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import createBooking from "../../redux/slices/bookingSlice";
import { clearError, clearMessage } from "../../redux/slices/bookingSlice";
import { bookingSchema } from "../../validationSchema/bookingSchema";

export default function BookingForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, message } = useSelector((state) => state.booking);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const initialValues = {
    name: "",
    phone: "",
    date: "",
    time: "",
    totalPersons: "",
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Show toast notifications when error or message changes
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
      });
      // Clear error after showing
      dispatch(clearError());
    }

    if (message) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
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
    dispatch(createBooking(values));
    setSubmitting(false);
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Reservation</h2>
      <p className="auth-subtitle">
        We consider all the drivers of change gives you the components you need
        to change to create a truly happens.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={bookingSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="auth-form">
            {/* Date Field */}
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <Field
                type="date"
                name="date"
                id="date"
                className={`form-input ${
                  errors.date && touched.date ? "input-error" : ""
                }`}
              />
              <ErrorMessage
                name="date"
                component="div"
                className="field-error"
              />
            </div>

            {/* Time Field */}
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <Field
                type="time"
                name="time"
                id="time"
                className={`form-input ${
                  errors.time && touched.time ? "input-error" : ""
                }`}
              />
              <ErrorMessage
                name="time"
                component="div"
                className="field-error"
              />
            </div>
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="John Doe"
                className={`form-input ${
                  errors.name && touched.name ? "input-error" : ""
                }`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="field-error"
              />
            </div>
            {/* Phone Field */}
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <Field
                type="tel"
                name="phone"
                id="phone"
                placeholder="123-456-7890"
                className={`form-input ${
                  errors.phone && touched.phone ? "input-error" : ""
                }`}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="field-error"
              />
            </div>

            {/* Total Persons Field */}
            <div className="form-group">
              <label htmlFor="totalPersons">Total Persons</label>
              <Field
                type="number"
                name="totalPersons"
                id="totalPersons"
                placeholder="1"
                min="1"
                max="12"
                className={`form-input ${
                  errors.totalPersons && touched.totalPersons
                    ? "input-error"
                    : ""
                }`}
              />
              <ErrorMessage
                name="totalPersons"
                component="div"
                className="field-error"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="btn btn-primary btn-full"
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
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
