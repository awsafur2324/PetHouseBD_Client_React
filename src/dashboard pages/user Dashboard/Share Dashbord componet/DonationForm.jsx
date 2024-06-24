/* eslint-disable react/prop-types */
import { Card, Typography, Input, Spinner } from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import ReactQuill from "react-quill";
const DonationForm = ({
  setStartDate,
  startDate,
  type,
  formik,
  UpdateData,
  handleQuillChange,
  handlefileChange,
  value,
  postLoading,

}) => {
  return (
    <div className="w-full px-2 ">
      <Card color="transparent" shadow={false}>
        <Typography
          variant="h4"
          color="blue-gray"
          className="text-3xl font-semibold font-display1 text-center mt-5"
        >
          {type === "Update"
            ? "Update Campaigns"
            : "Start Your Donation Campaigns"}
        </Typography>
        <Typography
          color="gray"
          className=" font-normal text-center text-sm mt-3 "
        >
          {type === "Update"
            ? "Edit or modify Your Donation Campaigns"
            : "Set the details of your Donation"}
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-start items-start gap-5 my-10"
        >
          {/* row 1 */}
          <div
            className={`flex flex-col ${
              type === "Update" ? "" : "md:flex-row"
            }  justify-center items-center gap-5 w-full text-xs`}
          >
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
                Select A Pet Image
              </Typography>
              <input
                type="file"
                name="Img"
                id="Img"
                onChange={handlefileChange}
                onBlur={formik.handleBlur}
                className="w-full border p-2 rounded-md border-gray-500"
              />
              {formik.touched.Img && formik.errors.Img && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                >
                  {formik.errors.Img}
                </div>
              )}
            </div>
          </div>
          {type === "Update" && (
            <div className=" w-28 h-28 overflow-hidden ">
              <h1>Current Image</h1>
              <img
                src={UpdateData.DonationImg}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {/* row 2 */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-5 w-full text-xs">
            <div className="relative mb-1 flex flex-col gap-6 w-full">
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-3 text-base md:text-sm lg:text-base"
              >
                Maximum Amount A User Can Donate
              </Typography>
              <Input
                placeholder="500"
                id="MaxAmount"
                name="MaxAmount"
                type="number"
                onChange={(e) => {
                  formik.setFieldValue(
                    "MaxDonation",
                    e.target.value ? parseFloat(e.target.value) : ""
                  );
                }}
                onBlur={formik.handleBlur}
                value={formik.values.MaxDonation}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                icon={<FaBangladeshiTakaSign />}
              />
              {formik.touched.MaxDonation && formik.errors.MaxDonation ? (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                >
                  {formik.errors.MaxDonation}
                </div>
              ) : null}
            </div>
            <div className="relative mb-1 flex flex-col gap-6 w-full">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Last Date of Donation
              </Typography>
              <div className="w-full grow border border-gray-500 rounded-md p-[5px]">
                <DatePicker
                  showIcon
                  className="focus:outline-none"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
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
          {/* row 4 */}
          <div className="relative mb-1 flex flex-col gap-6 w-full">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Long Description
            </Typography>
            <ReactQuill
              value={value}
              onChange={handleQuillChange}
              className="h-48 "
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
              <Spinner className="tex-center mx-auto" />
            ) : (
              <>
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                  {type == "Update" ? "Update Campaign" : " Create Campaign"}
                </span>
              </>
            )}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default DonationForm;
