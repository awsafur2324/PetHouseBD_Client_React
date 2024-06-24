import img from "../../../../assets/img/georgi-kalaydzhiev-sKIZOgsVo0Y-unsplash.jpg";

const WantPet = () => {
  return (
    <div
      style={{ backgroundImage: `url(${img})` }}
      className="bg-cover bg-fixed w-full py-10 sm:py-0 h-fit sm:h-96 z-10 bg-center bg-no-repeat rounded-lg my-10"
    >
      <div className="flex flex-col justify-center w-full h-full px-5 md:px-12 lg:px-20 text-white">
        <h1 className="text-3xl md:text-4xl font-display2 font-bold">
          Want a pet for your loved ones?
        </h1>
        <p className="my-5 font-display3 w-full md:w-[60%] text-xs md:text-base">
          Adopt a pet today.{"It's"} could be a great chance for you to impress your
          love ones . {"Pet's"} can be a good friends for you children.
        </p>
        <a
          href="#_"
          className="relative w-fit items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-pink-600 rounded-lg hover:bg-white group"
        >
          <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-lg"></span>
          <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-pink-600">
            Adopt Now
          </span>
        </a>
      </div>
    </div>
  );
};

export default WantPet;
