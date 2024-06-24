import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "./Share Dashbord componet/Form";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";

const PetsUpdate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [postLoading, setPostLoading] = useState(false);
  const params_id = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  //imgbb Api
  const imgAPIKey = import.meta.env.VITE_IMG_API_KEY;

  //react quill
  const [value, setValue] = useState("");
  //react select
  const [selected, setSelected] = useState(null);
  const [UserSelectData, setUserSelectData] = useState([]);
  const [SelectPetImage, setSelectPetImage] = useState(null);

  const [loading, setLoading] = useState(true);

  const handleQuillChange = (content) => {
    formikUpdate.setFieldValue("longDescription", content); // Update formik values
    setValue(content); // Update local state
  };
  const handleSelectChange = (selected) => {
    formikUpdate.setFieldValue("category", selected);
    setSelected(selected);
  };
  const handlefileChange = (event) => {
    formikUpdate.setFieldValue("petImage", event.target.files[0]);
    setSelectPetImage(event.target.files[0]);
  };

  const formikUpdate = useFormik({
    initialValues: {
      PetName: UserSelectData?.petName || "",
      age: UserSelectData.age || "",
      Location: UserSelectData.location || "",
      category: "",
      shortDescription: UserSelectData.shortDescription || "",
      longDescription: UserSelectData.longDescription || "",
      petImage: null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      PetName: Yup.string().required("Required"),
      age: Yup.string().required("Required"),
      Location: Yup.string().required("Required"),
      shortDescription: Yup.string().required("Required"),
      // category: Yup.object().nullable(),
      longDescription: Yup.string().required("Required"),
      // petImage: Yup.string().nullable(),
    }),
    onSubmit: async (values) => {
      if (!loading) {
        setPostLoading(true);
        if (SelectPetImage == UserSelectData.petImg) {
          //is user not change the image
          const AddPet = {
            petName: values.PetName,
            petImg: UserSelectData.petImg,
            age: values.age,
            location: values.Location,
            category: selected.value,
            shortDescription: values.shortDescription,
            longDescription: value,
            Author_email: UserSelectData.Author_email,
            Author_name: UserSelectData.Author_name,
            post_Create_Time: UserSelectData.post_Create_Time,
            Adopted: UserSelectData.Adopted,
          };
          // Log the form values to the console

          //TODO : send data to server
          const res = await axiosSecure.put(
            `/updatePets/${params_id.id}`,
            AddPet
          );
          if (res.data.modifiedCount) {
            setPostLoading(false);
            toast.success("Pet Updated Successfully");
            navigate("/dashboard/myAddedPets");
          } else {
            toast.error("Something went wrong");
          }
        }

        if (SelectPetImage != UserSelectData.petImg) {
          const formData = new FormData();
          formData.append("image", SelectPetImage);
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
            category: selected.value,
            shortDescription: values.shortDescription,
            longDescription: value,
            Author_email: UserSelectData.Author_email,
            Author_name: UserSelectData.Author_name,
            post_Create_Time: UserSelectData.post_Create_Time,
            Adopted: UserSelectData.Adopted,
          };
          // Log the form values to the console

          //TODO : send data to server
          const res = await axiosSecure.put(
            `/updatePets/${params_id.id}`,
            AddPet
          );
          if (res.data.modifiedCount) {
            toast.success("Pet Updated Successfully");
            navigate("/dashboard/myAddedPets");
          } else {
            toast.error("Something went wrong");
          }
        }
      }
    },
  });
  // find the data based on params_id

  useEffect(() => {
    axiosSecure.get(`/SelectPets/${params_id.id}`).then((data) => {
      setUserSelectData(data.data.result);
      setValue(data.data.result.longDescription || "");
      setSelected({
        label: data.data.result.category,
        value: data.data.category,
      });
      setSelectPetImage(data.data.result.petImg || "");
      setLoading(false);
    });
  }, [params_id.id, axiosSecure]);
  if (loading) {
    return (
      <>
        <Skeleton height={"50px"} width={"100%"} />
        <Skeleton height={"30px"} width={"100%"} count={14} />
      </>
    );
  }
  return (
    <div>
         <Helmet>
        <title>Pet House | Pet Update</title>
      </Helmet>
      <Form
        type={"Update"}
        formik={formikUpdate}
        handleQuillChange={handleQuillChange}
        handleSelectChange={handleSelectChange}
        handlefileChange={handlefileChange}
        value={value}
        selected={selected}
        postLoading={postLoading}
        UserSelectData={UserSelectData}
      />
    </div>
  );
};

export default PetsUpdate;
