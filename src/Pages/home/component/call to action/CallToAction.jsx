import { GiCheckMark } from "react-icons/gi";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/pagination';

import img from "../../../../assets/img/eric-ward-ISg37AI2A-s-unsplash.jpg";
import img1 from "../../../../assets/img/flouffy-g2FtlFrc164-unsplash.jpg";
import img2 from "../../../../assets/img/humberto-arellano-N_G2Sqdy9QY-unsplash.jpg";
import img3 from "../../../../assets/img/jonas-vincent-xulIYVIbYIc-unsplash.jpg";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
const CallToAction = () => {
  return (
    <div className="mt-16 flex flex-col md:flex-row justify-evenly items-center gap-5">
      {/* content */}
      <div className="w-full md:w-[60%]">
        <h1 className="text-xl text-red-500 font-display2 font-bold ">
          Call to Action
        </h1>
        <h1 className="text-2xl font-display3 font-semibold">
          Why Should You <span className="text-red-500">Adoption</span> A Pet
        </h1>
        <p className="text-sm font-display3 my-5 font-medium text-gray-800 dark:text-white">
          Adopting a pet saves lives, supports animal welfare, and combats
          unethical breeding. Pets provide companionship, improve health, and
          teach responsibility. Adoption is cost-effective, offers diverse
          choices, and enriches lives with joy and fulfillment, giving a
          deserving animal a loving home.
        </p>

        <ul className="text-sm font-display3 font-medium ">
          <li className="flex flex-row gap-2 items-center justify-start mb-2">
            <GiCheckMark className="text-red-500 " /> Save Lives and Support
            Welfare
          </li>
          <li className="flex flex-row gap-2 items-center justify-start mb-2">
            <GiCheckMark className="text-red-500" /> Health and Companionship
            Benefits
          </li>
          <li className="flex flex-row gap-2 items-center justify-start mb-2">
            <GiCheckMark className="text-red-500" /> Personal and Practical
            Benefits
          </li>
        </ul>
      </div>
      {/* img slider */}
      <div className="w-full md:w-[40%]">
        <Swiper
          direction={"vertical"}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Autoplay,Pagination]}
          className="h-[450px] rounded-lg"
        >
          <SwiperSlide>
            <img src={img} alt="" className="object-cover w-full h-full" />
          </SwiperSlide>
          <SwiperSlide><img src={img1} alt="" className="object-cover w-full h-full" /></SwiperSlide>
          <SwiperSlide><img src={img2} alt="" className="object-cover w-full h-full" /></SwiperSlide>
          <SwiperSlide><img src={img3} alt="" className="object-cover w-full h-full" /></SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default CallToAction;
