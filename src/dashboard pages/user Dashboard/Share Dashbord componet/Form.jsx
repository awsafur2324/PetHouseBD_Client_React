/* eslint-disable react/prop-types */
import CreatableSelect from "react-select/creatable";
import { Card, Input, Spinner, Typography } from "@material-tailwind/react";
import ReactQuill from "react-quill";

const options = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Bird", label: "Bird" },
  { value: "Fish", label: "Fish" },
];

const Form = ({
  type,
  formik,
  value,
  selected,
  handlefileChange,
  handleSelectChange,
  handleQuillChange,
  postLoading,
  UserSelectData,
}) => {
  return (
    <div className="w-full px-2">
      <Card color="transparent" shadow={false}>
        <Typography
          variant="h4"
          color="blue-gray"
          className="text-4xl font-semibold font-display1 text-center mt-5"
        >
          {type == "Add" ? "Add a pet" : "Update a pet"}
        </Typography>
        <Typography
          color="gray"
          className=" font-normal text-center text-sm mt-3 "
        >
          {type == "Add"
            ? "Enter the details of your pet to add it to the platform"
            : "Update your selected pet"}
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 mb-2 flex flex-col gap-5 max-w-screen "
        >
          {/* row 1 */}
          <div className="flex flex-col md:flex-row justify-around items-center gap-5">
            <div className="relative mb-1 flex flex-col gap-6 w-full">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Pet Name
              </Typography>
              <Input
                placeholder="German Shepherd"
                id="PetName"
                name="PetName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.PetName}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {formik.touched.PetName && formik.errors.PetName ? (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                >
                  {formik.errors.PetName}
                </div>
              ) : null}
            </div>
            <div className="relative mb-1 flex flex-col gap-6 w-full">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Pet Age
              </Typography>
              <Input
                placeholder="6 years 2 months"
                id="age"
                name="age"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {formik.touched.age && formik.errors.age ? (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                >
                  {formik.errors.age}
                </div>
              ) : null}
            </div>
          </div>
          {/* row 2 */}
          <div className="flex flex-col md:flex-row justify-around items-center gap-5">
            <div className="relative mb-1 flex flex-col gap-6 w-full">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Location
              </Typography>
              <Input
                placeholder="German Shepherd"
                id="Location"
                name="Location"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Location}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {formik.touched.Location && formik.errors.Location ? (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                >
                  {formik.errors.Location}
                </div>
              ) : null}
            </div>
            <div className="relative mb-1 flex flex-col gap-6 w-full">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Pet Category
              </Typography>
              <CreatableSelect
                isClearable
                name="category"
                id="category"
                options={options}
                className="rounded-lg"
                value={selected}
                onChange={handleSelectChange}
                onBlur={() => formik.setFieldTouched("category", true)}
              />
              {formik.touched.category && formik.errors.category ? (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                >
                  {formik.errors.category}
                </div>
              ) : null}
            </div>
          </div>

          {/* row 3 */}
          <div className="relative w-full flex  flex-col gap-6 mb-1">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Short Description
            </Typography>
            <textarea
              id="shortDescription"
              name="shortDescription"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.shortDescription}
              className="h-28 p-2 rounded-lg border border-gray-400 text-sm"
              placeholder="A short description of your pet"
            ></textarea>
            {formik.touched.shortDescription &&
            formik.errors.shortDescription ? (
              <div
                style={{
                  color: "red",
                  fontSize: "12px",
                  position: "absolute",
                  top: "0",
                  right: "0",
                }}
              >
                {formik.errors.shortDescription}
              </div>
            ) : null}
          </div>

          <div className="relative w-full flex  flex-col gap-6 mb-1">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Pet Image
            </Typography>
            {type == "Update" ? (
              <>
                <p>Current Pet Images</p>
                <img
                  src={UserSelectData.petImg}
                  alt="pet image"
                  className="w-20 object-cover"
                />
              </>
            ) : (
              <></>
            )}
            <input
              id="petImage"
              name="petImage"
              type="file"
              onChange={handlefileChange}
              onBlur={formik.handleBlur}
              accept="image/jpg, image/jpeg, image/png"
            />
            {formik.touched.petImage && formik.errors.petImage && (
              <div
                style={{
                  color: "red",
                  fontSize: "12px",
                  position: "absolute",
                  top: "0",
                  right: "0",
                }}
              >
                {formik.errors.petImage}
              </div>
            )}
          </div>

          <div className="relative mb-1 flex flex-col gap-6 w-full">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Long Description
            </Typography>
            <ReactQuill
              value={value}
              onChange={handleQuillChange}
              className="h-48"
            />
            {formik.touched.longDescription &&
              formik.errors.longDescription && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                >
                  {formik.errors.longDescription}
                </div>
              )}
          </div>
          <button
            type="submit"
            className=" my-10 w-full max-w-96 mx-auto relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
          >
            {postLoading ? (
              <Spinner className="tex-center mx-auto"/>
            ) : (
              <>
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                  {type == "Update" ? "Update Pet" : "Add Pet"}
                </span>
              </>
            )}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default Form;
