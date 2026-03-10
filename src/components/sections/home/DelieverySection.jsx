import { Clock4, CircleDollarSign, ShoppingCart } from "lucide-react";

import ChefCookingImg from "../../../assets/images/chef-cooking.jpg";
import SeafoodDishImg from "../../../assets/images/seafood-dish.jpg";
import GrilledMeatImg from "../../../assets/images/grilled-meat.jpg";

export default function DelieverySection() {
  // Define custom size classes for the images
  const mainImgClasses = "w-full max-w-[430px] h-[400px] md:h-[600px]";
  const seafoodImgClasses = "w-full max-w-[290px] h-[250px] md:h-[330px]";
  const meatImgClasses = "w-full max-w-[290px] h-[200px] md:h-[240px]";

  return (
    <section className="py-20 bg-light-coffee">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="shrink-0">
            <div className="flex flex-col sm:flex-row gap-6 items-center lg:items-start">
              <div className="shrink-0 w-full sm:w-auto flex justify-center">
                <img
                  src={ChefCookingImg}
                  alt="Chef preparing a dish"
                  className={`${mainImgClasses} object-cover rounded-lg shadow-lg`}
                />
              </div>

              <div className="flex flex-col gap-6 justify-between pt-0 w-full sm:w-auto">
                <div className="shrink-0 flex justify-center">
                  <img
                    src={SeafoodDishImg}
                    alt="Seafood dish"
                    className={`${seafoodImgClasses} object-cover rounded-lg shadow-lg`}
                  />
                </div>

                <div className="shrink-0 flex justify-center">
                  <img
                    src={GrilledMeatImg}
                    alt="Grilled meat platter"
                    className={`${meatImgClasses} object-cover rounded-lg shadow-lg`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grow">
            <h2 className="text-4xl md:text-5xl font-heading text-dark-gray mb-4 leading-tight max-w-lg">
              Fastest Food <br /> Delivery in City
            </h2>
            <p className="text-dark-gray mb-8 text-md max-w-lg">
              Our visual designer lets you quickly and of drag a down <br />
              your way to custom apps for both keep desktop.
            </p>

            <ul className="space-y-4">
              <li className="flex items-center font-medium text-md">
                <div className="mr-4 p-2 text-white bg-crimson rounded-full ">
                  <Clock4 size={16} />
                </div>
                <p className="text-dark-gray">Delivery within 30 minutes</p>
              </li>
              <li className="flex items-center font-medium text-md">
                <div className="mr-4 p-2 text-white bg-crimson rounded-full ">
                  <CircleDollarSign size={16} />
                </div>
                <p className="text-dark-gray">Best Offers & Prices</p>
              </li>
              <li className="flex items-center font-medium text-md">
                <div className="mr-4 p-2 text-white bg-crimson rounded-full ">
                  <ShoppingCart size={16} />
                </div>
                <p className="text-dark-gray">Online Services Available</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
