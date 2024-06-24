import { Link } from "react-router-dom";
import { LuCalendarClock } from "react-icons/lu";
import PropTypes from "prop-types";
import Clock from "./Clock";
import { format, isValid, parse } from "date-fns";
import { useEffect, useState } from "react";
import useAxios from "../../../custom hooks/useAxios";

const DonationCard = ({ camp }) => {
  const axios = useAxios();
  const [TotalDonation, setTotalDonation] = useState([]);
  const [Donated, setDonated] = useState(0);

  const parsedDate = camp?.DonationLastDate
    ? parse(camp.DonationLastDate, "dd,MM,yyyy", new Date())
    : null;
  const lastDate =
    parsedDate && isValid(parsedDate)
      ? format(parsedDate, "MM,dd,yyyy")
      : "Invalid Date";

  useEffect(() => {
    axios.get(`/findCollection/${camp._id}`).then((res) => {
      setTotalDonation(res.data);
    });
    let sum = 0;
    if (TotalDonation.length > 0) {
      TotalDonation.map((item) => {
        sum = sum + item.amount;
      });
      setDonated(sum / 100);
      sum = 0;
    }
  }, [axios, camp._id, TotalDonation]);

 
  return (
    <div className="border border-[#00000013] relative flex flex-col justify-center items-start group/Main w-full max-w-80 bg-white dark:bg-[#1D232A] rounded-lg shadow-lg p-3 pb-4 overflow-hidden ">
      <div className="overflow-hidden  mx-auto  w-full h-44">
        <img
          src={camp?.DonationImg}
          className="w-full h-full  object-cover group-hover/Main:scale-125 duration-300 "
        />
        <p className="flex flex-row justify-start items-center  absolute top-2 left-2 bg-pink-900 text-sm font-display rounded-r-full font-medium px-3 py-1 gap-1 text-white">
          {" "}
          <LuCalendarClock className="text-lg h-full" />{" "}
          <Clock deadline={lastDate} />
        </p>
      </div>
      <div className="p-3 font-display3 ">
        <h1 className="text-xl font-semibold">{camp?.PetName}</h1>
        <p className="text-sm text-dark2 my-2 dark:text-white">
          Max Donate Amount :{" "}
          <span className="font-display2">{camp?.MaxDonation}$</span>
        </p>
        <p className="text-sm text-dark2 my-2 dark:text-white">
          Donated Amount : <span className="font-display2">{Donated}$</span>
        </p>
      </div>

      {/* button */}
      <Link
        to={`/donateDetails/${camp?._id}`}
        className="mx-auto group mt-0 p-4 cursor-pointer relative text-sm font-normal border-0 flex items-center justify-center bg-transparent text-dark dark:text-green-500 h-auto w-full max-w-44 overflow-hidden transition-all duration-100"
      >
        <span className="group-hover:w-full absolute left-0 h-full w-5 border-y border-l border-dark dark:border-green-500 transition-all duration-500"></span>

        <p
          className="group-hover:opacity-0 group-hover:translate-x-[-100%] absolute translate-x-0 transition-all
         duration-200"
        >
          View Details
        </p>

        <span className="group-hover:translate-x-0  group-hover:opacity-100 absolute  translate-x-full opacity-0  transition-all duration-200">
          Donate Me !
        </span>

        <span className="group-hover:w-full absolute right-0 h-full w-5  border-y border-r border-dark  dark:border-green-500 transition-all duration-500"></span>
      </Link>
    </div>
  );
};
DonationCard.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  camp: PropTypes.any,
};
export default DonationCard;
