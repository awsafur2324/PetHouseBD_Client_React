import { Carousel } from "@material-tailwind/react";
import bg from "../../../../assets/img/cool-background.png";
import dark from "../../../../assets/img/wave-haikei.png";
import light from "../../../../assets/img/wave-haikei (1).png";
import user1 from "../../../../assets/img/2148283854.jpg";
import user2 from "../../../../assets/img/15187.jpg";
import user3 from "../../../../assets/img/45004.jpg";

import { FaQuoteLeft } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../../../../layouts/Root";
const HappyComments = () => {
  const { theme } = useContext(ThemeContext);
  const mybg = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <div id="Reviews">
      <h1 className="text-xl text-red-500 font-display2 font-bold text-center mt-10">
        Testimonials
      </h1>
      <h1 className="my-5 text-2xl sm:text-4xl font-display3 font-semibold text-center">
        Our <span className="text-red-500">Happy </span> Customer
      </h1>

      {/* slider */}
      <div className="w-full h-[500px] mt-10">
        <Carousel
          style={mybg}
          className=" rounded-b-xl bg-fixed"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-dark" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          autoplay={true}
          autoplayDelay={5000}
          loop={true}
        >
          {/* slider */}
          <div className=" relative w-full h-full flex flex-col justify-center items-center">
            {theme === "light" ? (
              <img
                src={light}
                alt=""
                className="absolute w-full h-full top-0"
              />
            ) : (
              <img src={dark} alt="" className="absolute w-full h-full top-0" />
            )}
            {/* card */}
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-5 w-full font-display4 p-2 xs:px-12 md:px-0">
              <img
                src={user1}
                alt=""
                className="w-24 h-24 rounded-full border-4 p-1 object-cover"
              />
              <div className="max-w-[400px] ">
                <p className="text-sm mb-3 font-medium">
                  {'"'}Adopting my pet from the local adoption center was one of
                  the best decisions {"I've"} ever made. The staff was
                  incredibly helpful and knowledgeable, and they made sure I
                  found the perfect pet for my family. Our new furry friend has
                  brought so much joy to our lives!{'"'}
                </p>
                <div className="flex flex-row justify-between items-center">
                  <div className="font-display3 text-lg">
                    <h1 className="font-semibold">John Doe</h1>
                    <p className="text-xs text-dark dark:text-light">
                      Happy Customer
                    </p>
                  </div>
                  <FaQuoteLeft className="text-4xl text-dark dark:text-light2" />
                </div>
              </div>
            </div>
          </div>
          {/* slider 1 */}
          <div className=" relative w-full h-full flex flex-col justify-center items-center">
            {theme === "light" ? (
              <img
                src={light}
                alt=""
                className="absolute w-full h-full top-0"
              />
            ) : (
              <img src={dark} alt="" className="absolute w-full h-full top-0" />
            )}
            {/* card */}
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-5 w-full font-display4 p-2 xs:px-12 md:px-0">
              <img
                src={user2}
                alt=""
                className="w-24 h-24 rounded-full border-4 p-1 object-cover"
              />
              <div className="max-w-[400px] ">
                <p className="text-sm mb-3 font-medium">
                  {'"'}I highly recommend the pet adoption center to anyone looking to add a furry companion to their family. The adoption process was smooth and easy, and the staff was very friendly and accommodating. They truly care about the animals and their well-being.{'"'}
                </p>
                <div className="flex flex-row justify-between items-center">
                  <div className="font-display3 text-lg">
                    <h1 className="font-semibold">Samanta Rahman</h1>
                    <p className="text-xs text-dark dark:text-light">
                      Happy Customer
                    </p>
                  </div>
                  <FaQuoteLeft className="text-4xl text-dark dark:text-light2" />
                </div>
              </div>
            </div>
          </div>
          {/* slider 2 */}
          <div className=" relative w-full h-full flex flex-col justify-center items-center">
            {theme === "light" ? (
              <img
                src={light}
                alt=""
                className="absolute w-full h-full top-0"
              />
            ) : (
              <img src={dark} alt="" className="absolute w-full h-full top-0" />
            )}
            {/* card */}
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-5 w-full font-display4 p-2 xs:px-12 md:px-0">
              <img
                src={user3}
                alt=""
                className="w-24 h-24 rounded-full border-4 p-1 object-cover"
              />
              <div className="max-w-[400px] ">
                <p className="text-sm mb-3 font-medium">
                  {'"'}{"I'"}ve adopted two pets from the local adoption center and have had nothing but positive experiences. The animals are well-cared for and the staff is always willing to answer any questions I have. Adopting from a shelter not only gives an animal a second chance at life, but it also helps support a great cause.{'"'}
                </p>
                <div className="flex flex-row justify-between items-center">
                  <div className="font-display3 text-lg">
                    <h1 className="font-semibold">Khan Awsafur Rahman</h1>
                    <p className="text-xs text-dark dark:text-light">
                      Happy Customer
                    </p>
                  </div>
                  <FaQuoteLeft className="text-4xl text-dark dark:text-light2" />
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default HappyComments;
