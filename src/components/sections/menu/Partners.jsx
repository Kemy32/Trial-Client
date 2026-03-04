import companies from "../../../assets/images/companies.png";

export default function Partners() {
  return (
    <section className="py-24 bg-light-coffee">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
        {/* Left Side: Content */}
        <div className="lg:w-1/3 text-left">
          <h2 className="text-5xl font-heading text-black mb-6 leading-tight">
            You can order <br /> through apps
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
            Enjoy your favorite dishes from the comfort of your home. We've
            partnered with the world's leading delivery platforms to ensure our
            fresh, seasonal meals reach your doorstep quickly and safely.
          </p>
        </div>

        {/* Right Side: Logo Grid */}
        <div className="lg:w-2/3 ">
          <img src={companies} className="" alt="partners" />
        </div>
      </div>
    </section>
  );
}
