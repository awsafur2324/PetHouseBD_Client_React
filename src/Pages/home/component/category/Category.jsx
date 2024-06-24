import bg from "../../../../assets/img/Group 1.png";
import { PiDogBold } from "react-icons/pi";
import { BiSolidCat } from "react-icons/bi";
import { LuFish } from "react-icons/lu";
import { LuBird } from "react-icons/lu";
import { ThemeContext } from "../../../../layouts/Root";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const Category = () => {
  const {setPetCategory } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden w-full text-white">
      <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-0 rounded-lg bg-[#F04336] max-w-fit mx-auto font-display font-semibold text-base xl:text-lg">
        {/* category */}
        <div className="w-96 lg:w-full bg-dark rounded-lg lg:rounded-l-lg relative flex flex-row justify-end items-center gap-0 text-center">
          <p className="py-16 p-10 lg:pl-20 w-full grow flex-1 text-nowrap text-center">
            Category
          </p>
          <img
            src={bg}
            alt=""
            className="top-0 right-0 object-cover hidden lg:block"
          />
        </div>
        {/* dogs */}
        <div onClick={() => {setPetCategory("Dog"); navigate("/PetList")}} className="py-12 lg:px-2 lg:pr-8 flex flex-row justify-center items-center gap-2 cursor-pointer hover:text-dark text-nowrap">
          <PiDogBold className="text-2xl" /> Find Dogs
        </div>
        <div className="h-[150px] w-[1px] bg-white hidden lg:block"></div>
        <hr className="w-full block lg:hidden" />
        <div onClick={() => {setPetCategory("Cat"); navigate("/PetList")}} className="py-12 lg:px-10 flex flex-row justify-center items-center gap-2 cursor-pointer hover:text-dark text-nowrap">
          <BiSolidCat className="text-2xl" /> Find Cats
        </div>
        <div className="h-[150px] w-[1px] bg-white hidden lg:block"></div>
        <hr className="w-full block lg:hidden" />
        <div onClick={() => {setPetCategory("Bird"); navigate("/PetList")}} className="py-12 lg:px-10 flex flex-row justify-center items-center gap-2 cursor-pointer hover:text-dark text-nowrap">
          <LuBird className="text-2xl" /> Find Birds
        </div>
        <div className="h-[150px] w-[1px] bg-white hidden lg:block"></div>
        <hr className="w-full block lg:hidden" />
        <div onClick={() => {setPetCategory("Fish"); navigate("/PetList")}} className="py-12 lg:px-10 flex flex-row justify-center items-center gap-2 cursor-pointer hover:text-dark text-nowrap">
          <LuFish className="text-2xl" /> Find Fish
        </div>
      </div>
    </div>
  );
};

export default Category;
