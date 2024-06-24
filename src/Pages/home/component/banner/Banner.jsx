import img from "../../../../assets/banner/joe-caione-qO-PIF84Vxg-unsplash.jpg";
import img1 from "../../../../assets/banner/krista-mangulsone-9gz3wfHr65U-unsplash.jpg";
import img2 from "../../../../assets/banner/raychan-KbiV1er60Wk-unsplash.jpg";
import light from "../../../../assets/banner/light.png";
import light1 from "../../../../assets/banner/light1.png";
import light2 from "../../../../assets/banner/light2.png";
import dark from "../../../../assets/banner/dark.png";
import dark1 from "../../../../assets/banner/dark1.png";
import dark2 from "../../../../assets/banner/dark2.png";
import shadow from "../../../../assets/banner/shadow.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { useContext } from "react";
import { ThemeContext } from "../../../../layouts/Root";
import { Link } from "react-router-dom";

const Banner = () => {
  const {theme} = useContext(ThemeContext);
  
  const backgroundStyle = {
    backgroundImage: ` url(${img})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const backgroundStyle1 = {
    backgroundImage: `url(${shadow}) , url(${img1})`,
    backgroundPosition: "center ,center",
    backgroundRepeat: "repeat , no-repeat",
    backgroundSize: "cover",

  };
  const backgroundStyle2 = {
    backgroundImage: ` url(${img2})`,
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={50}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper "
    >
      <SwiperSlide className="w-full overflow-hidden">
        <div className="w-full h-[600px]" style={backgroundStyle}>
          {theme === "light" ? (
            <img src={light} alt="" className="w-full absolute bottom-0" />
          ) : (
            <img src={dark} alt="" className="w-full absolute bottom-0" />
          )}
          {/* content */}
          <div className="font-display1 text-white px-10 sm:px-12 md:px-20 flex w-full h-full flex-col justify-center">
            <h1 className=" text-5xl md:text-7xl font-semibold mb-5">
              Ready to <span className="text-[#FBAE02]">Adopt!</span>
            </h1>
            <p className="w-full sm:max-w-[400px] font-display2 mb-5">
              Adopt a pet today and make a difference in your life. Pets are
              going to be a part of our family.
            </p>
            <Link to="/PetList"
              className="relative w-fit items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-green-600 rounded-lg hover:bg-white group"
            >
              <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-lg"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-green-600">
                Adopt Now
              </span>
            </Link>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="w-full overflow-hidden">
        <div className="w-full h-[600px]" style={backgroundStyle1} >
        {theme === "light" ? (
            <img src={light1} alt="" className="w-full absolute bottom-0" />
          ) : (
            <img src={dark1} alt="" className="w-full absolute bottom-0" />
          )}
          {/* content */}
          <div className="font-display1 text-white px-10 sm:px-12 md:px-20 flex w-full h-full flex-col justify-center">
            <h1 className="text-5xl md:text-6xl font-semibold mb-5 text-center text-[#fff] ">
              Best Friend <span className="">With </span> Happy Time
            </h1>
            <p className="max-w-[600px] font-display2 mb-5 mx-auto text-center text-lg text-[#FBAE02] font-extrabold">
              Caring for your pets is our top priority.They can be a part of our
              family. They can be a best buddy.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="w-full overflow-hidden">
        <div className="w-full h-[600px]" style={backgroundStyle2}>
        {theme === "light" ? (
            <img src={light2} alt="" className="w-full absolute bottom-0" />
          ) : (
            <img src={dark2} alt="" className="w-full absolute bottom-0 " />
          )}
          {/* content */}
          <div className="font-display1 text-white px-10 sm:px-12 md:px-20 flex w-full h-full flex-col justify-center items-end">
            <h1 className="text-5xl font-semibold mb-5 text-right text-[#fff]">
              <span className="text-[#FBAE02]">Donation Campaigns </span> for
              Pets!
            </h1>
            <div className="float-right">
              <p className=" font-display2 mb-5 text-right text-[#ffffff]  max-w-[600px] ">
                Donation campaigns for pets are initiatives designed to raise
                funds to support various needs related to animal welfare.
              </p>
              <Link to="/campaign"
                className="float-right relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-green-600 rounded-lg hover:bg-white group w-fit"
              >
                <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-lg"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-green-600">
                  Donate Now
                </span>
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
