import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { messageSchema } from "../../validationSchema/contactSchema";

export default function ContactForm() {
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    body: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axiosInstance.post("/contact", values);
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 5000,
        });
        resetForm();
      }
    } catch (error) {
      let errorMessage =
        error.response?.data?.message || "Failed to send email";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
      <Formik
        initialValues={initialValues}
        validationSchema={messageSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-6">

            <div className="flex flex-col sm:flex-row gap-6">

              <div className="w-full sm:w-1/2 flex flex-col gap-0.5">
                <label
                  htmlFor="name"
                  className="font-semibold text-sm text-dark-gray mb-1.5"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  className={`appearance-none rounded-full relative block w-full px-3 py-3 bg-white border-grayish border-2 placeholder-grayish  text-dark-gray  focus:outline-none focus:ring-mid-gray focus:border-mid-gray focus:z-10 sm:text-sm ${errors.name && touched.name
                      ? "outline-1 outline-mid-red border-mid-red"
                      : ""
                    }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-crimson mt-0.5 text-xs"
                />
              </div>


              <div className="w-full sm:w-1/2 flex flex-col gap-0.5">
                <label
                  htmlFor="email"
                  className="font-semibold text-sm text-dark-gray mb-1.5"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email address"
                  className={`appearance-none rounded-full relative block w-full px-3 py-3 bg-white border-grayish border-2 placeholder-grayish  text-dark-gray  focus:outline-none focus:ring-mid-gray focus:border-mid-gray focus:z-10 sm:text-sm ${errors.email && touched.email
                      ? "outline-1 outline-mid-red border-mid-red"
                      : ""
                    }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-crimson mt-0.5 text-xs"
                />
              </div>
            </div>


            <div className="flex flex-col gap-0.5">
              <label
                htmlFor="subject"
                className="font-semibold text-sm text-dark-gray mb-1.5"
              >
                Subject
              </label>
              <Field
                type="text"
                name="subject"
                id="subject"
                placeholder="Write a subject"
                className={`appearance-none rounded-2xl relative block w-full px-3 py-3 bg-white border-grayish border-2 placeholder-grayish  text-dark-gray  focus:outline-none focus:ring-mid-gray focus:border-mid-gray focus:z-10 sm:text-sm ${errors.subject && touched.subject
                    ? "outline-1 outline-mid-red border-mid-red"
                    : ""
                  }`}
              />
              <ErrorMessage
                name="subject"
                component="div"
                className="text-crimson mt-0.5 text-xs"
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <label
                htmlFor="body"
                className="font-semibold text-sm text-dark-gray mb-1.5"
              >
                Message
              </label>
              <Field
                as="textarea"
                name="body"
                id="body"
                rows="5"
                placeholder="Write your message"
                className={`appearance-none resize-y rounded-xl relative block w-full px-3 py-3 bg-white border-grayish border-2 placeholder-grayish  text-dark-gray  focus:outline-none focus:ring-mid-gray focus:border-mid-gray focus:z-10 sm:text-sm ${errors.body && touched.body
                    ? "outline-1 outline-mid-red border-mid-red"
                    : ""
                  }`}
              />
              <ErrorMessage
                name="body"
                component="div"
                className="text-crimson mt-0.5 text-xs"
              />
            </div>


            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-crimson hover:bg-coffee hover:text-crimson disabled:bg-crimson disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                "Send"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
