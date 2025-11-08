import * as Yup from "yup";

export const messageSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  subject: Yup.string()
    .min(8, "Subject must be at least 8 characters")
    .max(120, "Subject must be less than 120 characters")
    .required("Subject is required"),
  body: Yup.string()
    .min(8, "Message must be at least 8 characters")
    .max(200, "Message must be less than 200 characters")
    .required("Message is required"),
});
