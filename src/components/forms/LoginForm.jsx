import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { clearError, clearMessage, login } from "../../redux/slices/authSlice";
import { loginSchema } from "../../validationSchema/loginSchema";
import "../../styles/forms.css";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, error, message } = useSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
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
      dispatch(clearError);
      dispatch(clearMessage);
    };
  }, [dispatch]);

  const handleSubmit = async (values, { setSubmitting }) => {
    dispatch(login(values));
    setSubmitting(false);
  };

  return (
    <div>
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your account</p>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="auth-form">
                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
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

                {/* Password Field */}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-wrapper">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className={`form-input ${
                        errors.password && touched.password ? "input-error" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
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
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                {/* Register Link */}
                <p className="auth-footer">
                  Don't have an account?{" "}
                  <Link to="/register" className="auth-link">
                    Sign up
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
