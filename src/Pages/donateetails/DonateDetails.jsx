import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import DonationCard from "../donationCamp/donationCard/DonationCard";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import useAxios from "../../custom hooks/useAxios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(
  "pk_test_51PR83HAjQxNyQ8cOSDFID17HjsQHKJW5BZcGVqulCequN0bwiZCpV8KJHx3WwrhCm2mjqMDldbmCe5NJVsHi35OA00uy3IjPE4"
);

const DonateDetails = () => {
  const id = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const [DonateAmount, setDonateAmount] = useState(0);
  const [active, setActive] = useState(false);
  //details part
  const [donation, setDonation] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/donation_details/${id.id}`).then((data) => {
      setDonation(data.data);
    });
  }, [id, axiosSecure]);

  const axios = useAxios();
  const [TotalDonation, setTotalDonation] = useState([]);
  const [Donate, setDonated] = useState(0);
  useEffect(() => {
    axios.get(`/findCollection/${id.id}`).then((res) => {
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
  }, [axios, id.id, TotalDonation]);
  //last 3 card
  const [lastCard, setLastCard] = useState([]);
  useEffect(() => {
    axiosSecure.get("/donation_details_random").then((data) => {
      setLastCard(data.data);
    });
  }, [axiosSecure, id]);
  // model popup
  const [size, setSize] = useState(null);
  const handleOpen = (value) => {
    setSize(value);
    if (active === true) {
      setActive(false);
    }
  };

  const sanitizedHtmlContent = DOMPurify.sanitize(donation?.longDescription);
  // Sanitize the HTML content with the custom configuration
  //Tabs
  const data = [
    {
      label: "Long Description",
      value: "long",
      desc: sanitizedHtmlContent,
    },
    {
      label: "Sort Description",
      value: "Sort",
      desc: donation?.shortDescription,
    },
  ];

  if (!donation) {
    return <div>Loading...</div>;
  }
  const handelOpenCard = () => {
    if (DonateAmount > 0 && typeof DonateAmount === "number") {
      setActive(true);
    }
  };

  return (
    <div className="mt-2  p-4 lg:p-0">
         <Helmet>
        <title>Pet House | Donation Details</title>
      </Helmet>
      <div className="container  mx-auto flex flex-col md:flex-row justify-start items-stretch gap-10 ">
        <div className="  flex justify-center items-start rounded-xl p-5 w-full lg:w-[70%] ">
          {donation?.DonationImg ? (
            <img
              src={donation?.DonationImg}
              alt=""
              width={"100%"}
              className="w-full h-96 mx-auto object-contain"
            />
          ) : (
            <Skeleton
              height="300px"
              width="240px"
              borderRadius="0.5rem"
              baseColor="#E0E0E0"
              highlightColor="#F0F0F0"
              className="mt-2"
            />
          )}
        </div>
        <div className="  flex flex-col justify-start h-full items-stretch w-full my-2 font-display3">
          <h1 className="text-[#131313] dark:text-white text-4xl font-bold font-display4">
            {donation?.PetName || <Skeleton count={1} />}
          </h1>

          <p className="text-sm text-[#131313cc] dark:text-light font-medium font-display3 my-2">
            {donation?.post_Create_Time ? (
              <>
                <span className="font-semibold text-[#131313] dark:text-light2">
                  Create At :{" "}
                </span>
                {donation?.post_Create_Time}
              </>
            ) : (
              <Skeleton count={1} />
            )}
          </p>

          <hr />
          <p className="text-[#131313cc] dark:text-light text-sm font-medium  my-3">
            {donation?.DonationLastDate ? (
              <>
                {" "}
                <span className="font-semibold text-[#131313] dark:text-light2">
                  Last Date :{" "}
                </span>
                {donation?.DonationLastDate}
              </>
            ) : (
              <Skeleton count={1} />
            )}
          </p>
          <hr />
          <p className="flex flex-row justify-start items-center   text-[#131313cc] dark:text-light text-sm font-medium  my-3">
            {donation?.MaxDonation ? (
              <>
                <span className="font-semibold text-[#131313] dark:text-light2 mr-1">
                  Maximin Donate Amount :{" "}
                </span>
                {donation?.MaxDonation} $
              </>
            ) : (
              <Skeleton count={1} />
            )}
          </p>
          <hr />
          <p className="flex flex-row justify-start items-center   text-[#131313cc] dark:text-light text-sm font-medium  my-3">
            {Donate ? (
              <>
                {" "}
                <span className="font-semibold text-[#131313] dark:text-light2 mr-1">
                  Donated Amount :{" "}
                </span>
                {Donate} ${" "}
              </>
            ) : (
              <Skeleton count={1} />
            )}
          </p>
          <hr className="mb-3" />

          <div className="flex flex-row gap-5 mt-8 font-display1">
            {donation.pause === false ? (
              <button
                onClick={() => handleOpen("xs")}
                className=" relative rounded px-8 py-2 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Donate Now</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  Swal.fire({
                    title: "<strong>This Campaigns is <u>Paused</u></strong>",
                    icon: "info",
                    html: `
                    Wait for <b>unpause</b>
                  `,
                    focusConfirm: false,
                    confirmButtonText: `Ok!`,
                  });
                }}
                className=" relative rounded px-8 py-2 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Donate Now</span>
              </button>
            )}
          </div>
        </div>

        {/* model content */}
        <Dialog
          open={size === "xs"}
          size={size}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader className="absolute right-0 -top-1">
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="z-10 p-0"
            >
              <span>X</span>
            </Button>
          </DialogHeader>
          <DialogBody className="px-5 w-full">
            <div className="flex flex-col justify-start items-start gap-1 mb-5">
              Donation Form
              <p className="text-light text-sm font-normal">
                Help us to make this world a better place.
              </p>
            </div>
            <div className={`${active ? "hidden" : "block"} w-full`}>
              <Input
                type="number"
                onChange={(e) => {
                  setDonateAmount(parseFloat(e.target.value));
                }}
                label="Payment Amount"
                color="teal"
                icon={"$"}
              />
            </div>

            <button
              onClick={handelOpenCard}
              className={`${
                active ? "hidden" : "block"
              } bg-green-500 hover:bg-pink-600 text-white font-bold py-1 px-4 rounded my-2`}
            >
              Next
            </button>
            <div className="">
              {active ? (
                <Elements stripe={stripePromise}>
                  <CheckOutForm
                    donationId={donation._id}
                    closeDialog={handleOpen}
                    DonateAmount={DonateAmount}
                  />
                </Elements>
              ) : (
                <span className="text-red-500 text-xs text-center">
                  Enter Valid Amount & click next For Donate !
                </span>
              )}
            </div>
            <br />
          </DialogBody>
        </Dialog>
      </div>
      {/* tabs */}
      <div className="container mx-auto my-5">
        <Tabs value="long">
          <TabsHeader className="max-w-[500px] mx-auto font-display3">
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody className=" h-96 overflow-y-scroll">
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                <div
                  className="custom-list p-0 sm:px-5 font-display1 text-black dark:text-white"
                  dangerouslySetInnerHTML={{ __html: desc }}
                />
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
      {/* 3 donation card */}
      <h1 className="mt-5 text-4xl font-display3 font-semibold text-center">
        Latest <span className="text-red-500">Donate</span> Campaigns
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center place-items-center gap-5 mt-10 relative pb-20">
        {lastCard.map((card, index) => (
          <DonationCard key={index} camp={card} />
        ))}
      </div>
    </div>
  );
};

export default DonateDetails;
