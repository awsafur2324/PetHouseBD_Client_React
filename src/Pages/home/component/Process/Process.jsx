import img from "../../../../assets/img/1.jpg";
import img1 from "../../../../assets/img/1 (1).jpg";
import img2 from "../../../../assets/img/1 (2).jpg";
const Process = () => {
  return (
    <div id="Process">
      <h1 className="text-xl text-red-500 font-display2 font-bold text-center">
        How We Work
      </h1>
      <h1 className="my-5 text-4xl font-display3 font-semibold text-center">
        Pet <span className="text-red-500">Adoption</span> Process
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-5">
        {/* card 1 */}
        <div className="max-w-80 flex flex-col justify-center items-center p-5 text-center bg-white rounded-lg text-black">
          <img src={img} alt="" className="w-[90%] h-full" />
          <h1 className="text-xl font-semibold mt-5 mb-3 text-[#20621d] font-display1">Find Your Pert</h1>
          <p className="text-dark2 ">In the beginning you need to choose a pets from our category.</p>
        </div>
        {/* card 2 */}
        <div className="max-w-80 flex flex-col justify-center items-center p-5 text-center bg-white rounded-lg text-black">
          <img src={img1} alt="" className="w-[90%] h-full"/>
          <h1 className="text-xl font-semibold mt-5 mb-3 text-[#20621d] font-display1">Know Your Pert</h1>
          <p className="text-dark2 ">
            In this process you can see the basic information about your chosen
            pet.
          </p>
        </div>
        {/* card 1 */}
        <div className="max-w-80 flex flex-col justify-center items-center p-5 text-center bg-white rounded-lg text-black">
          <img src={img2} alt="" className="w-[90%] h-full" />
          <h1 className="text-xl font-semibold mt-5 mb-3 text-[#20621d] font-display1">Take Your Pet Home</h1>
          <p className="text-dark2 ">In the beginning you need to choose a pets from our category.</p>
        </div>
      </div>
    </div>
  );
};

export default Process;
