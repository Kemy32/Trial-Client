import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { EyeClosed, Eye } from "lucide-react";

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
  const { isLoading, error, message, pendingVerification, isAuthenticated } =
    useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    profile_image: "",
  };

  // Redirect if registered
  useEffect(() => {
    if (pendingVerification) {
      navigate("/verify-otp");
    }
  }, [pendingVerification, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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

  // Clear error and message on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch(register(values));
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="mt-6 mb-2 text-center text-3xl font-extrabold text-dark-gray">
          Create Account
        </h2>
        <p className="text-center text-sm text-mid-gray">
          Sign up to get started
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, errors, touched }) => (
            <Form className="mt-8 space-y-6">
              {/* Name Field */}
              <div className="flex flex-col gap-0.5 -space-y-px">
                <label
                  className="font-semibold text-sm text-dark-gray mb-1.5"
                  htmlFor="name"
                >
                  Full Name
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
                  className={`appearance-none rounded-full relative block w-full px-3 py-3 bg-white border-grayish border-2 placeholder-grayish  text-dark-gray  focus:outline-none focus:ring-mid-gray focus:border-mid-gray focus:z-10 sm:text-sm ${
                    errors.email && touched.email
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

              {/* Phone Field */}
              <div className="flex flex-col gap-0.5 -space-y-px">
                <label
                  className="font-semibold text-sm text-dark-gray mb-1.5"
                  htmlFor="phone"
                >
                  Phone Number (Optional)
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
                    className={`appearance-none rounded-full relative block w-full px-3 py-3 bg-white border-grayish border-2 placeholder-grayish  text-dark-gray  focus:outline-none focus:ring-mid-gray focus:border-mid-gray focus:z-10 sm:text-sm ${
                      errors.password && touched.password
                        ? "outline-1 outline-mid-red border-mid-red"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-mid-gray focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
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

              {/* Needs modifications */}
              {/* Profile Image Field */}
              {/* <div className="form-group rounded-md -space-y-px">
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
                  // form-input file-input
                  className={`appearance-none rounded-none relative block w-full px-3 py-3 bg-light-coffee border-dark-gray border-2 placeholder-grayish text-mid-gray rounded-b-md rounded-t-md focus:outline-none focus:ring-white focus:border-white focus:z-10 sm:text-sm ${
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
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-crimson hover:bg-coffee hover:text-crimson disabled:bg-crimson disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2 ">
                    <span className="spinner"></span>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-mid-gray">
                Already have an account?
                <Link
                  to="/login"
                  className="font-medium text-crimson hover:text-mid-red ml-1"
                >
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
