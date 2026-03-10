import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItemCard } from "../../ui/Card";
import {
  filterMenuItems,
  getAllMenuItems,
  resetMenuState,
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
    dispatch(resetMenuState());

    dispatch(getAllMenuItems());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: Number(import.meta.env.VITE_TOAST_AUTO_CLOSE_ERROR),
      });
      dispatch(clearError());
    }

    if (message) {
      toast.success(message, {
        position: import.meta.env.VITE_TOAST_AUTO_CLOSE_POSITION,
        autoClose: Number(import.meta.env.VITE_TOAST_AUTO_CLOSE_MESSAGE),
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
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto text-center mb-12 px-4">
        <h1 className="font-heading text-5xl md:text-7xl text-black mb-6">
          Our Menu
        </h1>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          Delicious food, thoughtfully prepared and beautifully served. Browse
          our categories to find your next favorite meal.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-16 px-4">
        {filters.map((item) => {
          const isActive = selectedCategory === item.category;
          return (
            <button
              key={item.category}
              onClick={() => handleFilterClick(item.category)}
              className={`px-6 py-2 md:px-8 flex items-center gap-2 rounded-full border transition-all font-semibold text-sm md:text-base ${isActive
                  ? "bg-crimson border-crimson text-white shadow-md"
                  : "bg-white border-gray-200 text-dark-gray hover:bg-light-coffee"
                }`}
            >
              <item.icon size={18} />
              {item.title}
            </button>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <p className="animate-pulse text-gray-400">
              Loading our delicious menu...
            </p>
          </div>
        ) : filteredItems && filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 items-stretch">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item._id}
                imgLink={item.image}
                title={item.title}
                category={item.category}
                price={`$${item.price}`}
                description={item.description}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-light-coffee rounded-2xl border-2 border-dashed border-coffee">
            <p className="text-gray-400 italic">
              No items found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
