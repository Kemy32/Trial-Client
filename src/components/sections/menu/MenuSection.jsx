import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItemCard } from "../../ui/Card";
import {
  filterMenuItems,
  getAllMenuItems,
  clearMessage,
  clearError,
} from "../../../redux/slices/menuSlice";
import { toast } from "react-toastify";
import { Utensils, HandPlatter, Wine, CakeSlice, EggFried } from "lucide-react";

export default function MenuSection() {
  const dispatch = useDispatch();
  const { filteredItems, selectedCategory, isLoading, error, message } =
    useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(getAllMenuItems());
  }, [dispatch]);

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

  const handleFilterClick = (category) => {
    dispatch(filterMenuItems({ category }));
  };

  const filters = [
    { title: "All", category: "all", icon: Utensils },
    { title: "Breakfast", category: "breakfast", icon: EggFried },
    { title: "Main Dishes", category: "main dish", icon: HandPlatter },
    { title: "Drinks", category: "drink", icon: Wine },
    { title: "Desserts", category: "dessert", icon: CakeSlice },
  ];

  return (
    <section className="py-12 bg-light-coffee">
      <div className="flex flex-col items-center text-center mb-10 px-4">
        <h1 className="font-heading text-7xl text-black mb-6">Our Menu</h1>
        <p className="max-w-xl text-gray-500 text-sm leading-relaxed">
          Delicious food, thoughtfully prepared and beautifully served. Browse
          our categories to find your next favorite meal, made with passion and
          the finest seasonal ingredients.
        </p>
      </div>
      {/* 2. Filter Buttons Wrapper */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {filters.map((item) => {
          const isActive = selectedCategory === item.category;
          return (
            <button
              key={item.category}
              onClick={() => handleFilterClick(item.category)}
              className={`px-8 py-2 flex items-center gap-2 rounded-full border transition-all font-semibold ${
                isActive
                  ? "bg-crimson border-crimson text-white shadow-md"
                  : "bg-white border-gray-300 text-dark-gray hover:bg-light-coffee"
              }`}
            >
              <item.icon size={18} />
              {item.title}
            </button>
          );
        })}
      </div>

      {/* 3. Grid Container for Cards */}
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {isLoading ? (
          <p className="col-span-full text-center py-10">
            Loading our delicious menu...
          </p>
        ) : filteredItems && filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <MenuItemCard
              key={item._id}
              imgLink={item.image}
              title={item.title}
              category={item.category}
              price={`$ ${item.price}`}
              description={item.description}
            />
          ))
        ) : (
          <p className="col-span-full text-center py-10">
            No items found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
