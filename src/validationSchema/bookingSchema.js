import * as Yup from "yup";

export const bookingSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  phone: Yup.string()
    .matches(/^[0-9+\-() ]*$/, "Invalid phone number format")
    .required("Phone is required"),
  totalPersons: Yup.number()
    .min(1, "Must be at least 1 person")
    .max(12, "Maximum 12 persons per booking")
    .required("Total persons is required")
    .typeError("Must be a number"),
  date: Yup.date()
    .required("Date is required")
    .min(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      "Date cannot be in the past"
    )
    .typeError("Invalid date format"),
  time: Yup.string()
    .required("Time is required")
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid time format (HH:MM)"
    ),
});
