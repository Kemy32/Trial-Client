import companies from "../../../assets/images/companies.png";

export default function Partners() {
  return (
    <section className="py-24 bg-light-coffee">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        <div className="lg:w-1/3 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-heading text-black mb-6 leading-tight">
            You can order <br className="hidden md:block" /> through apps
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
            Enjoy your favorite dishes from the comfort of your home. We've
            partnered with the world's leading delivery platforms to ensure our
            fresh, seasonal meals reach your doorstep quickly and safely.
          </p>
        </div>


        <div className="lg:w-2/3 w-full flex justify-center">
          <img
            src={companies}
            className="w-full max-w-2xl h-auto"
            alt="partners"
          />
        </div>
      </div>
    </section>
  );
}
