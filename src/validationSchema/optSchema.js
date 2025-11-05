import * as Yup from "yup";

export const otpSchema = Yup.object({
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be 6 digits")
    .required("OTP is required"),
});
