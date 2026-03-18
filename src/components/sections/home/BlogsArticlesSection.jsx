import { LinkBtn } from "../../ui/Buttons";
import { BlogArticleCard } from "../../ui/Card";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getAllBlogsArticles,
  clearError,
  clearMessage,
} from "../../../redux/slices/blogSlice";
import { toast } from "react-toastify";

export default function BlogsArticlesSection() {
  const dispatch = useDispatch();
  const { error, message, isLoading, blogsArticles } = useSelector((state) => {
    return state.blog;
  });

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: Number(import.meta.env.VITE_TOAST_AUTO_CLOSE_ERROR),
      });
      dispatch(clearError());
    }

    // Hidden to ignore showing fetched successfully in home page
    // if (message) {
    //   toast.success(message, {
    //     position: "top-center",
    //     autoClose: 3000,
    //   });
    //   dispatch(clearMessage());
    // }
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

  const displayedBlogsArticles = blogsArticles?.slice(0, 5) || [];

  return (
    <section className="py-20 bg-[#F9F9F7]">

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12 gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-dark-gray text-center sm:text-left">
            Our Blogs & Articles
          </h1>
          <LinkBtn
            to="/blogs-articles"
            text="Read All Articles"
            style="mainBtn"
          />
        </div>

        {isLoading ? (
          <div className="text-center py-20">Loading articles...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

            <div className="h-full">
              {displayedBlogsArticles[0] && (
                <BlogArticleCard
                  size="big"
                  imgLink={displayedBlogsArticles[0].image}
                  title={displayedBlogsArticles[0].title}
                  date={displayedBlogsArticles[0].date}
                  description={displayedBlogsArticles[0].content}
                />
              )}
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {displayedBlogsArticles.slice(1, 5).map((blog) => (
                <BlogArticleCard
                  key={blog._id}
                  size="small"
                  imgLink={blog.image}
                  title={blog.title}
                  date={blog.date}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
