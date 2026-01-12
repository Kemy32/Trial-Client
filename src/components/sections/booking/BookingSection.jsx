import BookingForm from "../../forms/BookingForm";
import RestaurantMapSection from "./RestaurantMapSection";

export default function BookingSection() {
  return (
    <section className="relative w-full h-300 flex flex-col">
      <div className="w-full h-130 flex items-center justify-start flex-col pt-12 bg-light-coffee z-10">
        <h1 className="font-heading text-7xl text-black mb-6">Book A Table</h1>
        <p className="max-w-2xl text-center text-mid-gray">
          Reserve your table now and ensure your place for an unforgettable
          dining experience. Effortlessly book your spot in just a few clicks
          below.
        </p>
      </div>

      <div className="w-full grow relative">
        <RestaurantMapSection />
      </div>

      <div className="absolute top-110 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-2xl px-4 sm:px-0">
        <BookingForm />
      </div>
    </section>
  );
}
