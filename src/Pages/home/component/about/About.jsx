import img from "../../../../assets/img/dog-P228UWM.jpg";
import { BiLogoBaidu } from "react-icons/bi";
const About = () => {
  return (
    <div id="About us">
      <h1 className="text-xl text-red-500 font-display2 font-bold text-center mt-10">
        About Us
      </h1>
      <h1 className="my-5 text-4xl font-display3 font-semibold text-center">
        Who <span className="text-red-500">We</span> Are
      </h1>

      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5">
        {/* img */}
        <div className="w-full md:w-1/2 rounded-lg bg-white p-3">
          <img src={img} alt="" className="w-full object-cover " />
        </div>
        {/* content */}
        <div className="w-full md:w-1/2 lg:w-1/3">
          <p className="text-dark2 text-sm text-justify font-display3 mb-3 leading-relaxed">
            We are a passionate team of animal lovers, advocates, and
            professionals committed to promoting pet adoption and animal
            welfare. Our collective experience spans across various fields
            including veterinary care, animal rescue, and pet training, ensuring
            that we provide comprehensive support to both adopters and animals.
          </p>

          <ul className="font-display1 text-base text-green-700">
            <li className="mb-1 flex flex-row justify-start items-center gap-1">
              <BiLogoBaidu className="text-xl text-dark2"/> Connecting Pets with Families
            </li>
            <li className=" mb-1 flex flex-row justify-start items-center gap-1">
              <BiLogoBaidu className="text-xl text-dark2"/> Support and Resources
            </li>
            <li className=" flex flex-row justify-start items-center gap-1">
              <BiLogoBaidu className="text-xl text-dark2"/> Advocacy and Education
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
