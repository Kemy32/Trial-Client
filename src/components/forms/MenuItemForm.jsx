import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { menuItemSchema } from "../../validationSchema/menuItemSchema";
import {
  clearError,
  clearMessage,
  createMenuItem,
} from "../../redux/slices/menuSlice";
import "../../styles/forms.css";

export default function MenuItemForm() {
  const dispatch = useDispatch();
  const { isLoading, error, message } = useSelector((state) => state.menu);
  const [previewImage, setPreviewImage] = useState(null);
  const initialValues = {
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  };

  // Show toast notifications when error or message changes
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
      });
      // Clear error after showing
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

  // Clean up on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const handleSubmit = async (values, { setSubmitting }) => {
    dispatch(createMenuItem(values));
    setSubmitting(false);
  };

  return (
    <>
      <div className="auth-card">
        <h2 className="auth-title">Create Menu Item</h2>
        <p className="auth-subtitle">
          Fill in the form below to create a new menu item
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={menuItemSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, errors, touched }) => (
            <Form className="auth-form">
              {/* Title Field */}
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter menu item title"
                  className={`form-input ${
                    errors.title && touched.title ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="field-error"
                />
              </div>

              {/* Description Field */}
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  rows="4"
                  placeholder="Enter menu item description"
                  className={`form-input ${
                    errors.description && touched.description
                      ? "input-error"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="field-error"
                />
              </div>

              {/* Price Field */}
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <Field
                  type="number"
                  name="price"
                  id="price"
                  placeholder="0.00"
                  step="0.01"
                  className={`form-input ${
                    errors.price && touched.price ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="field-error"
                />
              </div>

              {/* Category Field */}
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <Field
                  as="select"
                  name="category"
                  id="category"
                  className={`form-input ${
                    errors.category && touched.category ? "input-error" : ""
                  }`}
                >
                  <option value="">Select a category</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="main-dish">Main Dish</option>
                  <option value="dessert">Dessert</option>
                  <option value="drinks">Drinks</option>
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="field-error"
                />
              </div>

              {/* Image Field */}
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue("image", file);

                    // Preview image
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewImage(reader.result);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      setPreviewImage(null);
                    }
                  }}
                  className={`form-input file-input ${
                    errors.image && touched.image ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="field-error"
                />

                {previewImage && (
                  <div className="image-preview">
                    <img src={previewImage} alt="Preview" />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="btn btn-primary btn-full"
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Creating...
                  </>
                ) : (
                  "Create Menu Item"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
