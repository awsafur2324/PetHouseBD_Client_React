import { LiaDogSolid } from "react-icons/lia";
import CountUp from "react-countup";
import { BsShop } from "react-icons/bs";
import { GrUserExpert } from "react-icons/gr";
import { TbUserHeart } from "react-icons/tb";
const CountUpProcess = () => {
  return (
    <div id="Why us">
      <h1 className="text-xl text-red-500 font-display2 font-bold text-center mt-10">
        Why Choose Us ?
      </h1>
      <h1 className="my-5 text-4xl font-display3 font-semibold text-center">
        The Best <span className="text-red-500">Adoption</span> Center
      </h1>
      <div className="flex flex-wrap justify-evenly items-center gap-10 my-20">
        {/* card */}
        <div className="flex flex-col justify-center items-center w-fit">
          <div className="flex flex-row justify-center items-center  font-display2 gap-2 text-red-600">
            <LiaDogSolid className="w-20 text-6xl" />
            <div className="w-32">
              <CountUp
                start={0}
                end={5600}
                enableScrollSpy={true}
                duration={5}
                separator=","
                className="text-4xl"
              ></CountUp>
              +
            </div>
          </div>
          <h2 className="text-lg text-center font-display1  font-medium">
            Total Adoptions
          </h2>
        </div>
        {/* card */}
        <div className="flex flex-col justify-center items-center w-fit">
          <div className="flex flex-row justify-center items-center  font-display2 gap-2 text-red-600">
            <GrUserExpert className="w-20 text-5xl font-light" />
            <div className="w-32">
              <CountUp
                start={0}
                end={1000}
                enableScrollSpy={true}
                duration={5}
                separator=","
                className="text-4xl"
              ></CountUp>
              +
            </div>
          </div>
          <h2 className="text-lg text-center font-display1  font-medium">
            Active Users
          </h2>
        </div>
        {/* card */}
        <div className="flex flex-col justify-center items-center w-fit">
          <div className="flex flex-row justify-center items-center  font-display2 gap-2 text-red-600">
            <TbUserHeart className="w-20 text-5xl font-thin" />
            <div className="w-32">
              <CountUp
                start={0}
                end={10000}
                enableScrollSpy={true}
                duration={5}
                separator=","
                className="text-4xl"
              ></CountUp>
              +
            </div>
          </div>
          <h2 className="text-lg text-center font-display1  font-medium">
            Happy Clients
          </h2>
        </div>
        {/* card */}
        <div className="flex flex-col justify-center items-center w-fit">
          <div className="flex flex-row justify-center items-center  font-display2 gap-2 text-red-600">
            <BsShop className="w-20 text-5xl" />
            <div className="w-32">
              <CountUp
                start={0}
                end={8}
                enableScrollSpy={true}
                duration={10}
                separator=","
                className="text-4xl"
              ></CountUp>
              +
            </div>
          </div>
          <h2 className="text-lg text-center font-display1  font-medium">
            Years of History
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountUpProcess;
