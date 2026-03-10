import { LinkBtn } from "../../ui/Buttons";
import MeatMealImg from "../../../assets/images/meat-meal.png";
import { Phone, Mail, MapPin } from "lucide-react";

export default function MainSection() {
  return (
    <>
      <section className="bg-light-coffee pt-20 pb-40">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
                      grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center"
        >
          <div className="relative">
            <img
              src={MeatMealImg}
              className="w-full h-80 md:h-96 lg:h-[500px] object-cover object-center rounded-lg shadow-lg"
              alt="About us main image"
            />
            <div
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%] md:w-3/4 lg:w-[350px] lg:left-auto lg:translate-x-0 lg:-right-10 
                          bg-dark-gray text-white p-8 md:p-10 rounded-lg shadow-2xl z-10"
            >
              <h1 className="text-xl font-semibold mb-8">Come visit us</h1>
              <div className="space-y-3 text-sm text-white">
                <div className="flex items-center mb-7">
                  <div className=" mr-3">
                    <Phone size={18} />
                  </div>
                  <p className="">(+49) 01573 - 4698845</p>
                </div>
                <div className="flex items-center mb-7">
                  <div className="mr-3">
                    <Mail size={18} />
                  </div>
                  <p>owner@bistrobliss.com</p>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <p>
                    First 6th of October,<br></br> Giza Governorate 12655, Egypt
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-24 lg:pt-0">
            <h1 className="text-4xl md:text-5xl font-serif text-dark-gray mb-6 leading-tight">
              We provide healthy food for your family.
            </h1>
            <p className="text-dark-gray mb-4 font-medium text-lg max-w-lg">
              Our story began with a vision to create a unique dining experience
              that merges fine dining, exceptional service, and a vibrant
              ambiance. Rooted in city's rich culinary culture, we aim to honor
              our local roots while infusing a global palate.
            </p>
            <p className="text-dark-gray mb-8 text-base max-w-lg">
              At place, we believe that dining is not just about food, but also
              about the overall experience. Our staff, renowned for their warmth
              and dedication, strives to make every visit an unforgettable
              event.
            </p>
            {/* <LinkBtn
              key="AboutUsHomeSectionBtn"
              to="/about"
              text="More About Us"
              style="secondaryBtn"
            /> */}
          </div>
        </div>
      </section>
    </>
  );
}
