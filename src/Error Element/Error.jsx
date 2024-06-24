import { Link } from "react-router-dom";
import img from "../assets/img/13315300_5203299.jpg";
import { Helmet } from "react-helmet-async";
const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
         <Helmet>
        <title>Pet House | Error Found</title>
      </Helmet>
      <img className="w-1/3" src={img} alt="error image" />
      <Link
        to="/"
        className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-display3 font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
      >
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
        <span className="relative">Go to Homepage</span>
      </Link>
    </div>
  );
};

export default Error;
