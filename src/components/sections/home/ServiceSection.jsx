import CateringImg from "../../../assets/images/catering.jpg";
import BirthdayImg from "../../../assets/images/birthday.jpg";
import WeddingImg from "../../../assets/images/wedding.jpg";
import EventImg from "../../../assets/images/event.jpg";
import { ServiceCard } from "../../ui/Card";

export default function ServiceSection() {
  const servicesData = [
    {
      image: CateringImg,
      title: "Catering",
      description:
        "Elevate your off-site event with our full-service catering, providing custom menus, professional staff, and seamless setup for any party size.",
      alt: "Catering service with delicious appetizers",
    },
    {
      image: BirthdayImg,
      title: "Birthdays",
      description:
        "Celebrate with a custom-designed menu that delights every guest, featuring personalized appetizers, mains, and our signature dessert collection.",
      alt: "Birthday celebration with decorated cake",
    },
    {
      image: WeddingImg,
      title: "Weddings",
      description:
        "Craft an unforgettable culinary experience for your special day with dedicated menu tastings, bespoke plated dinners, or elegant buffet arrangements.",
      alt: "Wedding couple embracing",
    },
    {
      image: EventImg,
      title: "Corporate Events",
      description:
        "Ideal for major gatherings, festivals, or galas. We offer scalable food production, themed food stations, and reliable high-volume service.",
      alt: "Outdoor event with festive decorations",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-serif text-dark-gray text-center lg:text-left mb-16 max-w-2xl">
          We also offer unique services for your events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              imgLink={service.image}
              title={service.title}
              description={service.description}
              alt={service.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
