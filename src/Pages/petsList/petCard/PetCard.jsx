import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { IoLocationOutline } from "react-icons/io5";
const PetCard = ({pet}) => {
  return (
    <div className="border border-[#00000013] relative flex flex-col justify-center items-center group/Main w-full max-w-80 bg-white dark:bg-[#1D232A] rounded-lg shadow-lg p-3 pb-4 overflow-hidden text-center">
      <div className="overflow-hidden rounded-full w-44 h-44 mx-auto">
        <img
          src={pet.petImg}
          className="w-full h-full rounded-full object-cover group-hover/Main:scale-125 duration-300 "
        />
      </div>
      <p className="flex flex-row text-red-600  justify-center items-center font-medium font-display1 text-sm my-3">
        <IoLocationOutline /> {pet.location}
      </p>
      <h1 className="text-lg text-[#0A303A] dark:text-white font-bold font-display4">
       {pet.petName}
      </h1>
      <p className="text-dark2 dark:text-light text-sm ">Age : {pet.age}</p>
      {/* button */}
      <Link
        to={`/petDetails/${pet._id}`}
        className="group mt-4 p-4 cursor-pointer relative text-sm font-normal border-0 flex items-center justify-center bg-transparent text-dark dark:text-green-500 h-auto w-full max-w-44 overflow-hidden transition-all duration-100"
      >
        <span className="group-hover:w-full absolute left-0 h-full w-5 border-y border-l border-dark dark:border-green-500 transition-all duration-500"></span>

        <p
          className="group-hover:opacity-0 group-hover:translate-x-[-100%] absolute translate-x-0 transition-all
         duration-200"
        >
          View Details
        </p>

        <span className="group-hover:translate-x-0  group-hover:opacity-100 absolute  translate-x-full opacity-0  transition-all duration-200">
          Adopt Me !
        </span>

        <span className="group-hover:w-full absolute right-0 h-full w-5  border-y border-r border-dark  dark:border-green-500 transition-all duration-500"></span>
      </Link>
    </div>
  );
};
PetCard.propTypes = {
  pet: PropTypes.any,
};
export default PetCard;
