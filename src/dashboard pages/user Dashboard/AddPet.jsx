import "react-quill/dist/quill.snow.css";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthProvider } from "../../contextProvider/ContextProvider";
import useDate from "../../custom hooks/useDate";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Form from "./Share Dashbord componet/Form";
import { Helmet } from "react-helmet-async";

const AddPet = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [postLoading, setPostLoading] = useState(false);
  //call the axios secure
  const axiosSequre = useAxiosSecure();
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthProvider);
  //current date
  const date = useDate();

  //imgbb Api
  const imgAPIKey = import.meta.env.VITE_IMG_API_KEY;

  //react quill
  const [value, setValue] = useState("");

  //react select
  const [selected, setSelected] = useState(null);

  const formik = useFormik({
    initialValues: {
      PetName: "",
      age: "",
      Location: "",
      category: null,
      shortDescription: "",
      longDescription: "",
      petImage: null,
    },
    validationSchema: Yup.object({
      PetName: Yup.string().required("Required"),
      age: Yup.string().required("Required"),
      Location: Yup.string().required("Required"),
      shortDescription: Yup.string().required("Required"),
      category: Yup.object().nullable().required("Required"),
      longDescription: Yup.string().required("Required"),
      petImage: Yup.mixed().required("Required"),
    }),
    onSubmit: async (values) => {
      setPostLoading(true);
      const formData = new FormData();
      formData.append("image", values.petImage);
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
      const { url: petImg } = response.data.data;

      const AddPet = {
        petName: values.PetName,
        petImg: petImg,
        age: values.age,
        location: values.Location,
        category: values.category.value,
        shortDescription: values.shortDescription,
        longDescription: value,
        Author_email: user?.email,
        Author_name: user?.displayName,
        post_Create_Time: date,
        Adopted: false,
      };
      // Log the form values to the console

      axiosSequre
        .post("/AddPets", AddPet)
        .then(() => {
          formik.setFieldValue("petImage", petImg);
          setFile(null);
          document.getElementById("petImage").value = "";
          formik.resetForm();
          setValue("");
          setSelected(null);
          setPostLoading(false);
          toast.success("Pet added successfully");
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
  const handleSelectChange = (selected) => {
    formik.setFieldValue("category", selected);
    setSelected(selected);
  };
  const handlefileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    formik.setFieldValue("petImage", selectedFile);
  };
  return (
    <>
      <Helmet>
        <title>Pet House | Add Pets</title>
      </Helmet>
      <Form
        type={"Add"}
        formik={formik}
        handleQuillChange={handleQuillChange}
        handleSelectChange={handleSelectChange}
        handlefileChange={handlefileChange}
        value={value}
        selected={selected}
        postLoading={postLoading}
        file={file}
      />
    </>
  );
};

export default AddPet;
