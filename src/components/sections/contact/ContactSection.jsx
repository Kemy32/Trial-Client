import ContactForm from "../../forms/ContactForm";

export default function ContactSection() {
  return (
    <>
      <section className="flex items-center justify-start flex-col  bg-[linear-gradient(to_bottom,theme(colors.light-coffee)_50%,white_50%)] h-250  py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center flex-col">
          <h1 className="font-heading text-7xl text-black mb-6">Contact Us</h1>
          <p className="max-w-2xl text-center text-mid-gray mb-10">
            Please reach out with any questions regarding reservations, catering
            services, or if you simply want to tell us about your recent dining
            experience.
          </p>
        </div>
        <ContactForm />
        <div className="flex justify-evenly items-baseline flex-row w-3xl mt-16">
          <div>
            <p className="font-bold mb-5">Call Us:</p>
            <p className="font-semibold  text-crimson">+49 01573 - 4698845</p>
          </div>
          <div>
            <p className="font-bold mb-5">Working Hours:</p>
            <p>
              Mon-Fri: 11am - 8pm <br></br> Sat, Sun: 9am - 10pm
            </p>
          </div>
          <div>
            <p className="font-bold mb-5">Our Location:</p>
            <p>
              First 6th of October<br></br> Giza Governorate 12655<br></br>
              Egypt
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
