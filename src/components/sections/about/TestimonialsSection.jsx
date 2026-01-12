import { TestimonialCard } from "../../ui/Card";
import Avatar1 from "../../../assets/images/avatar1.jpg";
import Avatar2 from "../../../assets/images/avatar2.jpg";
import Avatar3 from "../../../assets/images/avatar3.jpg";

const testimonials = [
  {
    heading: "“The best restaurant”",
    paragraph:
      "Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.",
    avatarLink: Avatar1,
    name: "Sophie Robson",
    location: "Los Angeles, CA",
  },
  {
    heading: "“Simply delicious”",
    paragraph:
      "Place exceeded my expectations on all fronts. The ambiance was cozy and relaxed, making it a perfect venue for our anniversary dinner. Each dish was prepared and beautifully presented.",
    avatarLink: Avatar2,
    name: "Matt Cannon",
    location: "San Diego, CA",
  },
  {
    heading: "“One of a kind restaurant”",
    paragraph:
      "The culinary experience at place is first to none. The atmosphere is vibrant, the food - nothing short of extraordinary. The food was the highlight of our evening. Highly recommended.",
    avatarLink: Avatar3,
    name: "Andy Smith",
    location: "San Francisco, CA",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-heading font-medium text-center mb-12 text-dark-gray">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5  justify-items-center">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              heading={testimonial.heading}
              paragraph={testimonial.paragraph}
              avatarLink={testimonial.avatarLink}
              name={testimonial.name}
              location={testimonial.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
