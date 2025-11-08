import * as Yup from "yup";

export const bookingSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  phone: Yup.string()
    .matches(/^[0-9+\-() ]*$/, "Invalid phone number")
    .required("Phone is required"),
  totalPersons: Yup.number()
    .min(1, "Total persons must be at least 1")
    .max(12, "Total persons must be less than 12")
    .required("Total persons is required"),
  date: Yup.date().required("Date is required"),
  time: Yup.string().required("Time is required"),
});
