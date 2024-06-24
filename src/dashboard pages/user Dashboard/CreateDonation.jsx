import { useContext, useEffect, useState } from "react";
import DonationForm from "./Share Dashbord componet/DonationForm";
import { format } from "date-fns";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { toast } from "react-toastify";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthProvider } from "../../contextProvider/ContextProvider";
import useDate from "../../custom hooks/useDate";
import { Helmet } from "react-helmet-async";

const CreateDonation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [postLoading, setPostLoading] = useState(false);
  //call the axios secure
  const axiosSecure = useAxiosSecure();
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthProvider);
  //current date
  const date = useDate();
  //last date
  const [startDate, setStartDate] = useState(new Date());
  const lastDate = format(startDate, "dd,MM,yyyy");
  //imgbb Api
  const imgAPIKey = import.meta.env.VITE_IMG_API_KEY;

  //react quill
  const [value, setValue] = useState("");

  const formik = useFormik({
    initialValues: {
      PetName: "",
      MaxDonation: "",
      shortDescription: "",
      longDescription: "",
      Img: null,
    },
    validationSchema: Yup.object({
      PetName: Yup.string().required("Required"),
      MaxDonation: Yup.number()
        .typeError("Must be a number")
        .required("Required"),
      shortDescription: Yup.string().required("Required"),
      longDescription: Yup.string().required("Required"),
      Img: Yup.mixed().required("Required"),
    }),
    onSubmit: async (values) => {
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
        Author_email: user?.email,
        Author_name: user?.displayName,
        post_Create_Time: date,
        pause: false,
      };
      // Log the form values to the console

      axiosSecure
        .post("/CreateDonation", Donation)
        .then(() => {
          formik.setFieldValue("Img", DonationImg);
          setFile(null);
          document.getElementById("Img").value = "";
          setValue("");
          setStartDate(new Date());
          setPostLoading(false);
          formik.resetForm();
          toast.success("Donation added successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    },
  });

  const handleQuillChange = (content) => {
    formik.setFieldValue("longDescription", content); // Update formik values
    setValue(content); // Update local state
  };
  const handlefileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    formik.setFieldValue('Img', selectedFile);
  };
  return (
    <div>
         <Helmet>
        <title>Pet House | Create Donation</title>
      </Helmet>
      <DonationForm
        setStartDate={setStartDate}
        startDate={startDate}
        formik={formik}
        handleQuillChange={handleQuillChange}
        handlefileChange={handlefileChange}
        value={value}
        postLoading={postLoading}
        file={file}
      />
    </div>
  );
};

export default CreateDonation;
