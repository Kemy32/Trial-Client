import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { otpSchema } from "../../validationSchema/optSchema";
import { toast } from "react-toastify";
import {
  clearError,
  clearMessage,
  verifyOtp,
  resendOtp,
} from "../../redux/slices/authSlice";
import "../../styles/forms.css";

function OtpVerificationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, message, isAuthenticated, pendingEmail, user } =
    useSelector((state) => state.auth);

  const [countdown, setCountdown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);

  const initialValues = {
    otp: "",
  };

  useEffect(() => {
    if (!pendingEmail) {
      navigate("/register");
    }
  }, [pendingEmail, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, user]);

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

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handelResendOtp = async () => {
    if (countdown === 0) {
      setResendLoading(true);
      dispatch(resendOtp(pendingEmail));
      setCountdown(15);
      setResendLoading(false);
    }
  };

  const handleVerifyOtp = async (values, { setSubmitting }) => {
    dispatch(verifyOtp({ email: pendingEmail, otp: values.otp }));
    setSubmitting(false);
  };

  return (
    <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
      <Formik
        initialValues={initialValues}
        validationSchema={otpSchema}
        onSubmit={handleVerifyOtp}
      >
        {({ isSubmitting, values, errors, touched }) => (
          <Form className="space-y-6">
            <div className="flex flex-col gap-0.5 -space-y-px">
              <label
                className="font-semibold text-sm text-dark-gray mb-1.5"
                htmlFor="otp"
              >
                Enter OTP Code
              </label>
              <Field
                type="text"
                name="otp"
                id="otp"
                placeholder="Enter 6 digits"
                maxLength={6}
                className={`appearance-none rounded-full relative block w-full px-3 py-3 bg-white border-grayish border-2 placeholder-grayish  text-dark-gray  focus:outline-none focus:ring-mid-gray focus:border-mid-gray focus:z-10 sm:text-sm ${
                  errors.otp && touched.otp
                    ? "outline-1 outline-mid-red border-mid-red"
                    : ""
                }`}
              />
              <ErrorMessage
                name="otp"
                component="div"
                className="text-crimson mt-0.5 text-xs"
              />
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-crimson hover:bg-coffee disabled:hover:text-white hover:text-crimson disabled:bg-crimson disabled:opacity-50"
              disabled={
                isSubmitting ||
                isLoading ||
                values.otp.length < 6 ||
                values.otp.length > 6
              }
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="loader"></span>
                  Verifying...
                </div>
              ) : (
                "Verify OTP"
              )}
            </button>
          </Form>
        )}
      </Formik>
      <div className="my-5 flex items-center flex-col">
        <p className="text-center text-sm text-mid-gray">
          Didn't receive the code?
        </p>
        <button
          className="font-medium text-crimson hover:text-mid-red"
          onClick={handelResendOtp}
          disabled={countdown > 0 || resendLoading}
        >
          {resendLoading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="loader"></span>
              Resending...
            </div>
          ) : countdown > 0 ? (
            `Resend in ${countdown} seconds`
          ) : (
            "Resend OTP"
          )}
        </button>
      </div>
    </div>
  );
}

export default OtpVerificationForm;
