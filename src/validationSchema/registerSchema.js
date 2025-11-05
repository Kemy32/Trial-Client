import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9+\-() ]*$/, "Invalid phone number")
    .optional(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  profile_image: Yup.mixed()
    .optional()
    .test("fileSize", "File is too large (max 5MB)", (value) => {
      if (!value) return true;
      return value.size <= 5242880; // 5MB
    })
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return true;
      return ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
    }),
});
