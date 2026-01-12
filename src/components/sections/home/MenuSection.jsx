import tea from "../../../assets/icons/tea.png";
import dish from "../../../assets/icons/dish.png";
import drink from "../../../assets/icons/drink.png";
import dessert from "../../../assets/icons/dessert.png";

import { MenuCard } from "../../ui/Card";

export default function MenuSection() {
  const menu = [
    {
      id: 1,
      title: "Breakfast",
      alt: "breakfast icon",
      linktext: "Explore Breakfast Menu",
      image: tea,
      description:
        "Start your day right with our freshly brewed coffee, farm-fresh eggs, and signature fluffy pancakes. The perfect fuel for your morning.",
    },
    {
      id: 2,
      title: "Dish",
      alt: "dish icon",
      linktext: "Explore Dishes Menu",
      image: dish,
      description:
        "Experience our culinary heart with savory steaks, seasonal pasta dishes, and expertly crafted entrees cooked to perfection.",
    },
    {
      id: 3,
      title: "Drink",
      alt: "drink icon",
      linktext: "Explore Drinks Menu",
      image: drink,
      description:
        "Quench your thirst with our selection of classic cocktails, fine wines, craft beers, and refreshing house-made lemonades and mocktails.",
    },
    {
      id: 4,
      title: "Dessert",
      alt: "dessert icon",
      linktext: "Explore Desserts Menu",
      image: dessert,
      description:
        "End your meal with a sweet flourish. Indulge in decadent chocolate creations, creamy cheesecakes, and light, seasonal fruit tarts.",
    },
  ];

  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif text-dark-gray text-center mb-16">
            Browse Our Menu
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {menu.map((item) => (
              <MenuCard
                key={item.id}
                iconLink={item.image}
                alt={item.alt}
                heading={item.title}
                description={item.description}
                // Link here might be changed to menu by category
                // I will just leave it menu for now
                link="/menu"
                linkText={item.linktext}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
