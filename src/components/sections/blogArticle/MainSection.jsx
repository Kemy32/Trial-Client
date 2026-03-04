import { BlogArticleCard } from "../../ui/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllBlogsArticles,
  clearError,
  clearMessage,
} from "../../../redux/slices/blogSlice";

export default function MainSection() {
  const dispatch = useDispatch();

  const { error, message, isLoading, blogsArticles } = useSelector(
    (state) => state.blog,
  );

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
      });
      dispatch(clearError());
    }

    if (message) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(clearMessage());
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllBlogsArticles());
  }, [dispatch]);

  return (
    <section className="py-16 bg-white">
      {/* Centered Header */}
      <div className="max-w-3xl mx-auto text-center mb-16 px-4">
        <h1 className="font-heading text-5xl md:text-7xl text-black mb-6">
          Our Blogs & Articles
        </h1>
        <p className="text-gray-500 text-base leading-relaxed">
          Curate and manage your culinary stories. This space allows
          administrators to create and oversee the articles that share the
          flavors of Bistro Bliss with our community.
        </p>
      </div>

      {/* Grid Listing */}
      <div className="max-w-7xl mx-auto px-6">
        {isLoading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {blogsArticles.map((blog) => (
              <BlogArticleCard
                key={blog._id}
                size="small"
                imgLink={blog.image}
                title={blog.title}
                date={blog.date}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
