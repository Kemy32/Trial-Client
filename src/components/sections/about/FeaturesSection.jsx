import RestaurantMenu from "../../../assets/icons/restaurant-menu.png";
import Oven from "../../../assets/icons/oven.png";
import Timer from "../../../assets/icons/timer.png";

import HeroAbout from "../../../assets/images/hero-about.png";

const features = [
  {
    icon: RestaurantMenu,
    iconDescription: "Restaurant Menu",
    title: "Multi Cuisine",
    description:
      "Our kitchen specializes in flavors from around the world, offering a diverse menu that caters to every taste. Whether you crave international classics or regional favorites, you'll find exciting choices. Experience the best of global dining right here.",
  },
  {
    icon: Oven,
    iconDescription: "Oven",
    title: "Easy To Order",
    description:
      "We have streamlined the ordering process to be simple and convenient, whether you use our app or website. You can customize your meal, review your order clearly, and complete your purchase in just a few taps. Getting your favorite food is now faster than ever before.",
  },
  {
    icon: Timer,
    iconDescription: "Timer",
    title: "Fast Delivery",
    description:
      "We prioritize efficiency to ensure your meal arrives hot and fresh right to your door. Our optimized logistics and dedicated delivery team work quickly to minimize waiting times. Enjoy gourmet food delivered promptly so you can get back to your life.",
  },
];

export default function FeaturesSection() {
  return (
    <section>
      <div className="">
        <img className="w-full h-full bg-cover" src={HeroAbout} alt="" />
      </div>
      <div className="py-20 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="shrink-0 bg-light-coffee p-4 rounded-2xl shadow-sm">
                <img
                  className="w-12 h-12 object-contain"
                  src={feature.icon}
                  alt={feature.iconDescription}
                />
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-xl text-dark-gray font-bold font-heading">
                  {feature.title}
                </h1>
                <p className="text-sm text-dark-gray leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
