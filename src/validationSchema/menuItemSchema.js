import * as yup from "yup";

export const menuItemSchema = yup.object().shape({
  title: yup
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be less than 50 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(8, "Description must be at least 8 characters")
    .max(200, "Description must be less than 200 characters")
    .required("Description is required"),
  price: yup
    .number()
    .required("Price is required")
    .typeError("Price must be a number"),
  category: yup
    .string()
    .oneOf(["breakfast", "main dish", "dessert", "drink"])
    .required("Category is required"),
  image: yup.mixed().optional(),
});
