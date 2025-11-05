import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .min(1, "Password is required")
    .required("Password is required"),
});
