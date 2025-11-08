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
  const { isLoading, error, message, isAuthenticated, pendingEmail } =
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
      setCountdown(30);
      setResendLoading(false);
    }
  };

  const handleVerifyOtp = async (values, { setSubmitting }) => {
    dispatch(verifyOtp({ email: pendingEmail, otp: values.otp }));
    setSubmitting(false);
  };

  return (
    <div className="auth-card">
      <Formik
        initialValues={initialValues}
        validationSchema={otpSchema}
        onSubmit={handleVerifyOtp}
      >
        {({ isSubmitting, values, errors, touched }) => (
          <Form className="auth-form">
            <div className="form-group">
              <label htmlFor="otp">Enter OTP Code</label>
              <Field
                type="text"
                name="otp"
                id="otp"
                placeholder="Enter 6 digits"
                maxLength={6}
                className={`form-input otp-input ${
                  errors.opt && touched.otp ? "input-error" : ""
                }`}
              />
              <ErrorMessage
                name="otp"
                component="div"
                className="field-error"
              />
            </div>
            <button
              type="submit"
              disable={
                isSubmitting ||
                isLoading ||
                values.otp.length < 6 ||
                values.otp.length > 6
              }
            >
              {isLoading ? (
                <>
                  <span className="loader"></span>
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </button>
          </Form>
        )}
      </Formik>
      <div className="otp-resend">
        <p>Didn't receive the code?</p>
        <button
          onClick={handelResendOtp}
          disabled={countdown > 0 || resendLoading}
        >
          {resendLoading ? (
            <>
              <span className="loader"></span>
              Resending...
            </>
          ) : countdown > 0 ? (
            `Resend in ${countdown} seconds`
          ) : (
            "Resend OTP"
          )}
        </button>
      </div>
      <p className="auth-footer">
        <Link to="/register" className="auth-link">
          Back to registration
        </Link>
      </p>
    </div>
  );
}

export default OtpVerificationForm;
