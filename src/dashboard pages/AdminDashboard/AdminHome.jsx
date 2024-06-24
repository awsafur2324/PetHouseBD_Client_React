import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { AuthProvider } from "../../contextProvider/ContextProvider";
import Chart from "../user Dashboard/Share Dashbord componet/Chart";
import PieChartData from "./AdminHomeChart/PieChart";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
  const { user } = useContext(AuthProvider);
  const axiosSecure = useAxiosSecure();
  const [userCount, setUserCount] = useState(0);
  const [DonationCount, setDonationCount] = useState(0);
  const [petCount, setPetCount] = useState(0);
  const [AdoptionCount, setAdoptionCount] = useState(0);
  const [PaymentHistory, setPaymentHistory] = useState([]);
  const [PaymentData, setPaymentData] = useState([]);
  //Donate HIstory
  useEffect(() => {
    axiosSecure.get(`/AllDonationHistory_Admin`).then((res) => {
      setPaymentData(res.data.result);
      setPaymentHistory(res.data.DonateDetails);
    });
  });
  //count data
  useEffect(() => {
    axiosSecure.get(`/Users/${user?.email}`).then((res) => {
      setUserCount(res.data.count);
    });
    axiosSecure.get(`/Donation_Count`).then((res) => {
      setDonationCount(res.data.count);
    });
    axiosSecure.get(`/Pet_counts`).then((res) => {
      setPetCount(res.data.count);
    });
    axiosSecure.get(`/AdoptCount/${user?.email}`).then((res) => {
      setAdoptionCount(res.data.count);
    });
  }, [axiosSecure, user?.email]);
  return (
    <div>
      <Helmet>
        <title>Pet House | Admin Home</title>
      </Helmet>
      <div className="min-h-[20vh] flex flex-wrap justify-evenly items-center gap-5 relative  rounded">
        <Link
          to="/dashboard/Users"
          className="text-center text-xl font-display1 p-5 rounded-lg bg-dark text-white w-64"
        >
          <h1 className=" font-semibold text-center text-light">
            Register Users
          </h1>
          <p className="text-3xl font-display2 mt-2">{userCount}</p>
        </Link>
        <Link
          to="/dashboard/AllDonation"
          className="text-center text-xl font-display1 p-5 rounded-lg bg-dark  text-white w-64"
        >
          <h1 className=" font-semibold text-center text-light">
            All Donation Campaigns
          </h1>
          <p className="text-3xl font-display2 mt-2">{DonationCount}</p>
        </Link>
        <Link
          to="/dashboard/AllPets"
          className="text-center text-xl font-display1 p-5 rounded-lg bg-dark  text-white w-64"
        >
          <h1 className=" font-semibold text-center text-light">All Pets</h1>
          <p className="text-3xl font-display2 mt-2">{petCount}</p>
        </Link>
        <Link
          to="/dashboard/AdoptionRequest"
          className="text-center text-xl font-display1 p-5 rounded-lg bg-dark text-white w-64"
        >
          <h1 className=" font-semibold text-center text-light">
            My Adoption Request
          </h1>
          <p className="text-3xl font-display2 mt-2">{AdoptionCount}</p>
        </Link>
      </div>

      {/* chart */}
      <div className=" relative flex flex-col lg:flex-row justify-center items-start gap-5">
        <div className="w-full lg:w-[70%] ">
          <p className="text-2xl font-display1 font-semibold my-5 mt-10">
            Payment History
          </p>
          <Chart data={PaymentData} />
        </div>
        <div className="w-full lg:w-[30%] h-[500px] overflow-y-scroll">
          <p className="text-2xl font-display1 font-semibold my-5 mt-10 ">
            Payment Details
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
                {PaymentHistory.map((donate, id) => (
                  <tr
                    key={id}
                    className={` text-sm my-2 ${
                      donate.refund == true ? "text-red-600" : "text-green-600"
                    }`}
                  >
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
      {/* pie chart */}
      <h1 className="text-2xl font-display1 font-semibold my-5 mt-10 text-center">
        Users Details
      </h1>
      <PieChartData />
    </div>
  );
};

export default AdminHome;
