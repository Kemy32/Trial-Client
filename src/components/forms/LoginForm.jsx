import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { EyeClosed, Eye } from "lucide-react";
import { clearError, clearMessage, login } from "../../redux/slices/authSlice";
import { loginSchema } from "../../validationSchema/loginSchema";

import "../../styles/forms.css";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoading,
    isAuthenticated,
    pendingVerification,
    pendingEmail,
    error,
    message,
  } = useSelector((state) => state.auth);

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

  useEffect(() => {
    // verification is required, redirect to the OTP page.
    if (pendingVerification && pendingEmail) {
      dispatch(clearError());
      dispatch(clearMessage());
      navigate("/verify-otp");
    }
  }, [pendingVerification, pendingEmail, navigate, dispatch]);

  // Show toast notifications when error or message changes
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: Number(import.meta.env.VITE_TOAST_AUTO_CLOSE_ERROR),
      });
      dispatch(clearError());
    }

    if (message) {
      toast.success(message, {
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: Number(import.meta.env.VITE_TOAST_AUTO_CLOSE_MESSAGE),
      });
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
    dispatch(login(values));
    setSubmitting(false);
  };

  return (
    <>
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="mt-6 mb-2 text-center text-3xl font-extrabold text-dark-gray">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-mid-gray">
          Sign in to your account
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="mt-8 space-y-6">
              {/* Email Field */}
              <div className="flex flex-col gap-0.5 -space-y-px">
                <label
                  className="font-semibold text-sm text-dark-gray mb-1.5"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="john@example.com"
                  className={`appearance-none rounded-full relative block w-full px-3 py-3 bg-white border-grayish border-2 placeholder-grayish  text-dark-gray  focus:outline-none focus:ring-mid-gray focus:border-mid-gray focus:z-10 sm:text-sm ${errors.email && touched.email
                      ? "outline-1 outline-mid-red border-mid-red"
                      : ""
                    }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-crimson mt-0.5 text-xs"
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-0.5 -space-y-px">
                <label
                  className="font-semibold text-sm text-dark-gray mb-1.5"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className={`appearance-none rounded-full relative block w-full px-3 py-3  bg-white border-grayish border-2 placeholder-grayish  text-mid-gray  focus:outline-none focus:ring-mid-gray focus:border-mid-gray focus:z-10 sm:text-sm  ${errors.password && touched.password
                        ? "outline-1 outline-mid-red border-mid-red"
                        : ""
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-mid-gray focus:outline-none"
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
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
                  <div className="flex items-center justify-center gap-2 ">
                    <span className="spinner"></span>
                    <span className="text-white"> Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Register Link */}
              <p className="text-center text-sm text-mid-gray">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-crimson hover:text-mid-red ml-1"
                >
                  Sign up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
