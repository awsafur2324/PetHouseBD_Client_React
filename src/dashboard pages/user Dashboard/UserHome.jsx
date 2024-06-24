import { useContext, useEffect, useState } from "react";
import Chart from "./Share Dashbord componet/Chart";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { AuthProvider } from "../../contextProvider/ContextProvider";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const UserHome = () => {
  const { user } = useContext(AuthProvider);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const axiosSecure = useAxiosSecure();
  const [petCount, setPetCount] = useState(0);
  const [adoptionCount, setAdoptionCount] = useState(0);
  const [donationCount, setDonationCount] = useState(0);
  const [data, setData] = useState([]);
  const [donateDetails, setDonateDetails] = useState([]);
  useEffect(() => {
    axiosSecure.get(`/donationHistory/${user?.email}`).then((res) => {
      setData(res.data.result);
      setDonateDetails(res.data.DonateDetails);
    });
  }, [axiosSecure, user?.email]);
  useEffect(() => {
    axiosSecure.get(`/petCount/${user?.email}`).then((res) => {
      setPetCount(res.data.count);
    });
    axiosSecure.get(`/DonateCount/${user?.email}`).then((res) => {
      setDonationCount(res.data.count);
    });
    axiosSecure.get(`/AdoptCount/${user?.email}`).then((res) => {
      setAdoptionCount(res.data.count);
    });
  }, [axiosSecure, user?.email]);
  return (
    <div>
         <Helmet>
        <title>Pet House | User Dashboard</title>
      </Helmet>
      <div className="min-h-[20vh] flex flex-wrap justify-evenly items-center gap-5 relative  rounded">
        <Link
          to="/dashboard/myAddedPets"
          className="text-center text-xl font-display1 p-5 rounded-lg bg-dark text-white w-72"
        >
          <h1 className=" font-semibold text-center text-light">
            Total Pets Added
          </h1>
          <p className="text-3xl font-display2 mt-2">{petCount}</p>
        </Link>
        <Link
          to="/dashboard/AdoptionRequest"
          className="text-center text-xl font-display1 p-5 rounded-lg bg-dark text-white w-72"
        >
          <h1 className=" font-semibold text-center text-light">
            Adoption Request
          </h1>
          <p className="text-3xl font-display2 mt-2">{adoptionCount}</p>
        </Link>
        <Link
          to="/dashboard/myDonationCampaigns"
          className="text-center text-xl font-display1 p-5 rounded-lg bg-dark  text-white w-72"
        >
          <h1 className=" font-semibold text-center text-light">
            Total Donation Campaigns
          </h1>
          <p className="text-3xl font-display2 mt-2">{donationCount}</p>
        </Link>
      </div>

      {/* chart */}
      <div className=" relative flex flex-col lg:flex-row justify-center items-start gap-5">
        <div className="w-full lg:w-[70%] ">
          <p className="text-2xl font-display1 font-semibold my-5 mt-10">
            Donation History
          </p>
          <Chart data={data} />
        </div>
        <div className="w-full lg:w-[30%] h-[500px] overflow-y-scroll">
          <p className="text-2xl font-display1 font-semibold my-5 mt-10 ">
            Donate Details
          </p>
          <div className="">
            <table
              border={1}
              className="divide-y text-left text-gray-600 divide-gray-200 overflow-x-scroll mx-auto w-full text-xs text-nowrap"
            >
              <thead>
                <th className="px-2">Name</th>
                <th className="px-2">Date</th>
                <th className="px-2">Status</th>
                <th className="px-2">Amount</th>
              </thead>

              <tbody>
                {donateDetails.map((donate, id) => (
                  <tr key={id} className={` text-sm my-2 ${donate.refund == true ? "text-red-600" : "text-green-600"}`}>
                    <td className="px-2">
                      {donate.user_name.length > 12
                        ? donate.user_name.slice(0, 12) + "..."
                        : donate.user_name}
                    </td>
                    <td className=" px-2">{donate.date}</td>
                    <td className="px-2">
                      {donate.refund ? "Refund" : "Donate"}
                    </td>
                    <td className="px-2">{donate.amount}$</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
