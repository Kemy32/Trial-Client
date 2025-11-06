import { React } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { registerSchema } from "../../validationSchema/registerSchema";
import {
  register,
  clearError,
  clearMessage,
} from "../../redux/slices/authSlice";
import "../../styles/forms.css";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const { isLoading, error, message, pendingVerification } = useSelector(
    (state) => state.auth
  );

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    profile_image: null,
  };

  useEffect(() => {
    if (pendingVerification) {
      navigate("/verify-otp");
    }
  }, [pendingVerification, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
      });
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

  const handleSubmit = async (values, { setSubmitting }) => {
    dispatch(register(values));
    setSubmitting(false);
  };

  return (
    <>
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Sign up to get started</p>

        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, errors, touched }) => (
            <Form className="auth-form">
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
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

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="john@example.com"
                  className={`form-input ${
                    errors.email && touched.email ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="field-error"
                />
              </div>

              {/* Phone Field */}
              <div className="form-group">
                <label htmlFor="phone">Phone Number (Optional)</label>
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

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`form-input ${
                    errors.password && touched.password ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="field-error"
                />
              </div>

              {/* Profile Image Field */}
              <div className="form-group">
                <label htmlFor="profile_image">Profile Image (Optional)</label>
                <input
                  type="file"
                  name="profile_image"
                  id="profile_image"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue("profile_image", file);

                    // Preview image
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewImage(reader.result);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      setPreviewImage(null);
                    }
                  }}
                  className={`form-input file-input ${
                    errors.profile_image && touched.profile_image
                      ? "input-error"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="profile_image"
                  component="div"
                  className="field-error"
                />

                {previewImage && (
                  <div className="image-preview">
                    <img src={previewImage} alt="Preview" />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="btn btn-primary btn-full"
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Login Link */}
              <p className="auth-footer">
                Already have an account?
                <Link to="/login" className="auth-link">
                  Sign in
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
