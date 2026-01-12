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
      <div className="py-16 px-4 md:px-12 sm:items-center lg:px-24 flex flex-col lg:flex-row lg:justify-between gap-10">
        {features.map((feature, index) => (
          <div key={index} className="w-md flex flex-row gap-7">
            <div>
              <img
                className="max-w-15 "
                src={feature.icon}
                alt={feature.iconDescription}
              />
            </div>
            <div>
              <h1 className="text-xl text-black font-bold mb-4">
                {feature.title}
              </h1>
              <p className="text-sm text-dark-gray max-w-2xs">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
