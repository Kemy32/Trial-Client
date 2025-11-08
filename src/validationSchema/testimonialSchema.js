import * as Yup from "yup";

export const testimonialSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  location: Yup.string()
    .min(2, "Location must be at least 2 characters")
    .max(50, "Location must be less than 50 characters")
    .required("Location is required"),
  title: Yup.string()
    .min(2, "Title must be at least 2 characters")
    .max(60, "Title must be less than 60 characters")
    .required("Title is required"),
  review: Yup.string()
    .min(8, "Review must be at least 8 characters")
    .max(200, "Review must be less than 200 characters")
    .required("Review is required"),
});
