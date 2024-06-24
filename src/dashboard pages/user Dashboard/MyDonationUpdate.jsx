import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import DonationForm from "./Share Dashbord componet/DonationForm";
import { useFormik } from "formik";
import { format, parse } from "date-fns";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const MyDonationUpdate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const id = useParams();
  const location = useLocation();
  const { from } = location.state || {};
  const Navigate = useNavigate();
  const [postLoading, setPostLoading] = useState(false);
  const [SeleteData, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  //last date
  const [startDate, setStartDate] = useState(new Date());
  const lastDate = format(startDate, "dd,MM,yyyy");
  //imgbb Api
  const imgAPIKey = import.meta.env.VITE_IMG_API_KEY;

  //react quill
  const [value, setValue] = useState("");
  const handleQuillChange = (content) => {
    formikUpdate.setFieldValue("longDescription", content); // Update formik values
    setValue(content); // Update local state
  };
  const handlefileChange = async (event) => {
    await formikUpdate.setFieldValue("Img", event.target.files[0]);
  };

  const formikUpdate = useFormik({
    initialValues: {
      PetName: SeleteData?.PetName || "",
      MaxDonation: SeleteData?.MaxDonation || "",
      shortDescription: SeleteData?.shortDescription || "",
      longDescription: SeleteData?.longDescription || "",
      Img: null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      PetName: Yup.string().required("Required"),
      MaxDonation: Yup.number()
        .typeError("Must be a number")
        .required("Required"),
      shortDescription: Yup.string().required("Required"),
      longDescription: Yup.string().required("Required"),
      // Img: Yup.mixed().required("Required"),
    }),
    onSubmit: async (values) => {
      if (!loading) {
        const img = values.Img;
        if (img === null) {
          setPostLoading(true);
          const Donation = {
            PetName: values.PetName,
            MaxDonation: values.MaxDonation,
            DonationImg: SeleteData.DonationImg,
            shortDescription: values.shortDescription,
            longDescription: value,
            DonationLastDate: lastDate,
          };
          // Log the form values to the console

          axiosSecure
            .patch(`/UpdateDonation/${id.id}`, Donation)
            .then(() => {
              formikUpdate.resetForm();
              setValue("");
              setStartDate(new Date());
              setPostLoading(false);
              toast.success("Donation added successfully");
              Navigate(
                from == "allDonation"
                  ? "/dashboard/AllDonation"
                  : "/dashboard/myDonationCampaigns"
              );
            })
            .catch((error) => {
              toast.error(error.message);
            });
        } else {
          setPostLoading(true);
          const formData = new FormData();
          formData.append("image", values.Img);
          const response = await axios.post(
            "https://api.imgbb.com/1/upload",
            formData,
            {
              params: {
                key: imgAPIKey, // Replace with your actual API key
              },
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const { url: DonationImg } = response.data.data;

          const Donation = {
            PetName: values.PetName,
            MaxDonation: values.MaxDonation,
            DonationImg: DonationImg,
            shortDescription: values.shortDescription,
            longDescription: value,
            DonationLastDate: lastDate,
          };
          // Log the form values to the console

          axiosSecure
            .patch(`/UpdateDonation/${id.id}`, Donation)
            .then(() => {
              formikUpdate.resetForm();
              setValue("");
              setStartDate(new Date());
              setPostLoading(false);
              toast.success("Donation added successfully");
              Navigate(
                from == "allDonation"
                  ? "/dashboard/AllDonation"
                  : "/dashboard/myDonationCampaigns"
              );
        
            })
            .catch((error) => {
              toast.error(error.message);
            });
        }
      }
    },
  });

  useEffect(() => {
    axiosSecure.get(`/DonationCamp_Update/${id.id}`).then((data) => {
      setData(data.data);
      setValue(data.data.longDescription || "");
      const parsedDate = parse(
        data.data.DonationLastDate,
        "dd,MM,yyyy",
        new Date()
      );
      setStartDate(parsedDate || new Date());
      setLoading(false);
    });
  }, [axiosSecure, id]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
         <Helmet>
        <title>Pet House | Donation Update</title>
      </Helmet>
      <DonationForm
        type="Update"
        UpdateData={SeleteData}
        setStartDate={setStartDate}
        startDate={startDate}
        formik={formikUpdate}
        handleQuillChange={handleQuillChange}
        handlefileChange={handlefileChange}
        value={value}
        postLoading={postLoading}
      />
    </div>
  );
};

export default MyDonationUpdate;
