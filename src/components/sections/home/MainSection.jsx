import { LinkBtn } from "../../ui/Buttons";
import heroImg from "../../../assets/images/hero-img.png";
export default function MainSection() {
  return (
    <section className="relative overflow-hidden h-screen">
      <img
        src={heroImg}
        className="absolute inset-0 w-full h-full object-cover object-center"
        alt="home main section image"
      />
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading text-black mb-6 md:mb-8 max-w-4xl">
          Best food for your taste
        </h1>
        <p className="text-lg md:text-xl text-dark-gray max-w-lg mb-8 md:mb-10">
          Discover delectable cuisine and unforgettable moments in our
          welcoming, culinary haven.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <LinkBtn
            key="mainHomeSectionBookBtn"
            to="/booking"
            text="Book A Table"
            style="mainBtn"
          ></LinkBtn>
          <LinkBtn
            key="mainHomeSectionMenuBtn"
            to="/menu"
            text="Explore Menu"
            style="secondaryBtn"
          ></LinkBtn>
        </div>
      </div>
    </section>
  );
}
