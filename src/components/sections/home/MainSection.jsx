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
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-8xl font-heading text-black mb-8 max-w-xl">
          Best food for your taste
        </h1>
        <p className="text-xl text-dark-gray max-w-lg mb-10">
          Discover delectable cuisine and unforgettable moments in our
          welcoming, culinary haven.
        </p>
        <div className="flex space-x-4">
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
      <h1>main home section</h1>
    </section>
  );
}
