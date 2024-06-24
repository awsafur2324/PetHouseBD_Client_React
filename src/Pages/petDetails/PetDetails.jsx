import { useContext, useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePhoneAndroid } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { AuthProvider } from "../../contextProvider/ContextProvider";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Helmet } from "react-helmet-async";

const PetDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [AdoptedRequest, setAdoptedRequest] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthProvider);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axiosSecure.get(`/SelectPets/${id}`).then((data) => {
      setAdoptedRequest(data.data.AdoptRequest);
      setDetails(data.data.result);
    });
  }, [id, axiosSecure]);

  // model popup
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);

  //formik
  const formik = useFormik({
    initialValues: {
      Phone: "",
      Address: "",
    },
    validationSchema: Yup.object({
      Phone: Yup.string().required("Required"),
      Address: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setRequestSent(false);
      const { Phone, Address } = values;
      const AdoptData = {
        PetId: id,
        PetName: details?.petName,
        PetImg: details?.petImg,
        Author_email: details.Author_email,
        Adopt_user: user?.displayName,
        Adopt_email: user?.email,
        Adopt_phone: Phone,
        Adopt_address: Address,
        Request_date: new Date().toLocaleDateString("en-GB"),
        Status: "Pending",
      };
      const response = await axiosSecure.post("/PetAdopt", AdoptData);

      if (response.data.acknowledged) {
        formik.resetForm();
        handleOpen(true);
        toast.success("Adoption request sent successfully");
        setRequestSent(true);
      }
    },
  });

  return (
    <div className="container mt-2 mb-20 mx-auto flex flex-col md:flex-row justify-start items-stretch gap-10 p-4 lg:p-0">
         <Helmet>
        <title>Pet House | Pet Details</title>
      </Helmet>
      <div className="flex justify-center items-start rounded-xl p-5 w-full lg:w-[70%]">
        {details?.petImg ? (
          <img
            src={details?.petImg}
            alt=""
            width="80%"
            height="100%"
            className="mx-auto object-contain"
          />
        ) : (
          <Skeleton
          height="250px"
          width="350px"
          borderRadius=".5rem"
          baseColor="#E0E0E0"
          highlightColor="#F0F0F0"
        />
        )}
      </div>
      <div className="w-full my-2 font-display3">
        <h1 className="text-[#131313] dark:text-white text-4xl font-bold font-display4">
          {details?.petName || <Skeleton />}
        </h1>
        {details?.age ? (
          <p className="text-sm text-[#131313cc] dark:text-light font-medium font-display3 my-2">
            <span className="font-semibold text-[#131313] dark:text-light2">
              Age :{" "}
            </span>
            {details?.age}
          </p>
        ) : (
          <Skeleton count={1} />
        )}
        <hr />
        {details?.category ? (
          <p className="text-[#131313cc] dark:text-light text-sm font-medium  my-3">
            <span className="font-semibold text-[#131313] dark:text-light2">
              Category :{" "}
            </span>
            {details?.category}
          </p>
        ) : (
          <Skeleton count={1} />
        )}
        <hr />
        {details?.shortDescription ? (
          <p className="text-sm sans-font my-4">
            <span className="font-semibold text-[#131313] dark:text-light2">
              Short Description :{" "}
            </span>{" "}
            <span className="text-wrap text-justify text-[#131313cc] dark:text-light font-medium capitalize">
              {details?.shortDescription}
            </span>
          </p>
        ) : (
          <Skeleton count={1} />
        )}
        <hr />
        {details?.longDescription ? (
          <p className="text-sm sans-font my-4">
            <span className="font-semibold text-[#131313] dark:text-light2">
              Long Description :{" "}
            </span>{" "}
            <span
              className="text-wrap text-justify text-[#131313d1] dark:text-light block font-normal my-2 capitalize custom-list font-display1 "
              dangerouslySetInnerHTML={{ __html: details?.longDescription }}
            ></span>
          </p>
        ) : (
          <Skeleton count={1} />
        )}
        <hr className="my-5" />
        {details?.location ? (
          <div className="flex flex-row justify-start items-start gap-5">
            <div className="flex flex-row justify-start items-center gap-2 text-[#131313] dark:text-light2 font-medium text-xs sans-font">
              <IoLocationOutline /> <p>Location :</p>
            </div>
            <div className="flex flex-col gap-2 text-[#131313cc] dark:text-light font-semibold text-xs sans-font">
              <p>{details?.location}</p>
            </div>
          </div>
        ) : (
          <Skeleton count={1} />
        )}
        {details ? (
          <div className="flex flex-row gap-5 mt-8 font-display1">
            {AdoptedRequest || requestSent ? (
              <span className="text-green-500 font-display1">
                Request Already Sent
              </span>
            ) : (
              <button
                onClick={() => handleOpen("xs")}
                className="relative rounded px-8 py-2 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Adopt</span>
              </button>
            )}
          </div>
        ) : (
          <Skeleton count={1} />
        )}
      </div>

      {/* model content */}
      <Dialog
        open={size === "xs"}
        size={size}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="flex flex-col justify-start items-start font-display3">
          {details?.petName || <Skeleton width="200px" />}
          <p className="text-light text-sm font-normal">
            Fill the form for adaptation request
          </p>
        </DialogHeader>

        <DialogBody className="px-5">
          <form>
            <Input
              value={user.displayName}
              label="Your Name"
              color="teal"
              icon={<FaRegUser />}
            />
            <div className="my-4"></div>
            <Input
              value={user.email}
              label="Your Email"
              color="teal"
              icon={<MdOutlineEmail />}
            />
            <div className="my-4"></div>
            <div className="relative w-full">
              <Input
                name="Phone"
                type="number"
                label="Your Phone"
                color="teal"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Phone}
                icon={<MdOutlinePhoneAndroid />}
              />
              {formik.touched.Phone && formik.errors.Phone ? (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                >
                  {formik.errors.Phone}
                </div>
              ) : null}
            </div>
            <div className="my-4"></div>
            <div className="relative w-full">
              <Input
                name="Address"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Address}
                label="Your Address"
                color="teal"
                icon={<TbAddressBook />}
              />
              {formik.touched.Address && formik.errors.Address ? (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                >
                  {formik.errors.Address}
                </div>
              ) : null}
            </div>
            <br />
            <Button
              type="submit"
              variant="gradient"
              color="green"
              className="float-end mb-8"
              onClick={formik.handleSubmit}
            >
              <span>Submit</span>
            </Button>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default PetDetails;
