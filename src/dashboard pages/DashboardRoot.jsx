import { Link, Outlet, useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
} from "@material-tailwind/react";
import { RiMenuFoldFill } from "react-icons/ri";
import { RiMenuFold2Fill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { AuthProvider } from "../contextProvider/ContextProvider";
import useFindAdmin from "../custom hooks/useFindAdmin";
import { Helmet } from "react-helmet-async";
const DashboardRoot = () => {
  //user and Admin
  const { user } = useContext(AuthProvider);
  const [Admin] = useFindAdmin();
  const location = useLocation();
  //   for drawer
  const [open, setOpen] = useState(true);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  //for collapse for pets
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleCollapse = () => setIsCollapsed(!isCollapsed);

  //for collapse for Adoption Request
  const [isCollapsedRequest, setIsCollapsedRequest] = useState(false);
  const handleCollapseRequest = () =>
    setIsCollapsedRequest(!isCollapsedRequest);

  //for collapse for donation
  const [isCollapsedDonation, setIsCollapsedDonation] = useState(false);
  const handleCollapseDonation = () =>
    setIsCollapsedDonation(!isCollapsedDonation);
  //check the current window width to close the drawer
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        closeDrawer();
      } else {
        openDrawer();
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Pet House | Dashboard</title>
      </Helmet>

      <div className="flex flex-row justify-start items-start w-full overflow-hidden">
        {/* drawer */}
        <div
          className={`${
            open ? " mr-0 md:mr-[300px] relative inline-block " : "w-0 mr-0"
          } duration-500`}
        >
          <Drawer
            open={open}
            overlay={false}
            className="py-4 overflow-y-scroll scrollCustomize"
          >
            <div className="mb-6 flex  items-center justify-between">
              <Link to="/">
                <Typography variant="h5" color="blue-gray" className="px-4">
                  Pet House BD
                </Typography>
              </Link>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={closeDrawer}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </div>
            {/* links */}
            <List className="w-full">
              {user && !Admin && (
                <Link
                  to="userDashboard"
                  className={`rounded-lg ${
                    location.pathname === "/dashboard/userDashboard"
                      ? "bg-[#0A303A] text-white"
                      : ""
                  }`}
                >
                  <ListItem>User Dashboard</ListItem>
                </Link>
              )}
              {user && Admin && (
                <Link
                  to="AdminDashboard"
                  className={`rounded-lg ${
                    location.pathname === "/dashboard/AdminDashboard"
                      ? "bg-[#0A303A] text-white"
                      : ""
                  }`}
                >
                  <ListItem>Admin Dashboard</ListItem>
                </Link>
              )}
              <ListItem
                onClick={() => {
                  handleCollapse();
                  // setIsCollapsedDonation(false);
                }}
              >
                Pets
                <ListItemSuffix>
                  <IconButton variant="text" color="blue-gray">
                    {isCollapsed ? <IoIosArrowDown /> : <IoIosArrowForward />}
                  </IconButton>
                </ListItemSuffix>
              </ListItem>
              <div className={`w-full ${isCollapsed ? "block" : "hidden"}`}>
                <List className="w-full">
                  <Link
                    to="addPet"
                    className={`rounded-lg ${
                      location.pathname === "/dashboard/addPet"
                        ? "bg-[#0A303A] text-white"
                        : ""
                    }`}
                  >
                    <ListItem>Add a pet</ListItem>
                  </Link>
                  <Link
                    to="myAddedPets"
                    className={`rounded-lg ${
                      location.pathname === "/dashboard/myAddedPets"
                        ? "bg-[#0A303A] text-white"
                        : ""
                    }`}
                  >
                    <ListItem>My added pets</ListItem>
                  </Link>
                </List>
              </div>
              {/* adoption request */}

              <ListItem
                onClick={() => {
                  handleCollapseRequest();
                  // setIsCollapsedDonation(false);
                }}
              >
                Adoption Request
                <ListItemSuffix>
                  <IconButton variant="text" color="blue-gray">
                    {isCollapsedRequest ? (
                      <IoIosArrowDown />
                    ) : (
                      <IoIosArrowForward />
                    )}
                  </IconButton>
                </ListItemSuffix>
              </ListItem>
              <div
                className={`w-full ${isCollapsedRequest ? "block" : "hidden"}`}
              >
                <List className="w-full">
                  <Link
                    to="AdoptionRequest"
                    className={`rounded-lg ${
                      location.pathname === "/dashboard/AdoptionRequest"
                        ? "bg-[#0A303A] text-white"
                        : ""
                    }`}
                  >
                    <ListItem>All Request</ListItem>
                  </Link>
                  <Link
                    to="AcceptedRequest"
                    className={`rounded-lg ${
                      location.pathname === "/dashboard/AcceptedRequest"
                        ? "bg-[#0A303A] text-white"
                        : ""
                    }`}
                  >
                    <ListItem>Accepted Request History</ListItem>
                  </Link>
                  <Link
                    to="RequestStatus"
                    className={`rounded-lg ${
                      location.pathname === "/dashboard/RequestStatus"
                        ? "bg-[#0A303A] text-white"
                        : ""
                    }`}
                  >
                    <ListItem>My Request Status</ListItem>
                  </Link>
                </List>
              </div>

              {/* donation */}
              <ListItem
                onClick={() => {
                  handleCollapseDonation();
                  // setIsCollapsed(false);
                }}
              >
                Donation
                <ListItemSuffix>
                  <IconButton variant="text" color="blue-gray">
                    {isCollapsedDonation ? (
                      <IoIosArrowDown />
                    ) : (
                      <IoIosArrowForward />
                    )}
                  </IconButton>
                </ListItemSuffix>
              </ListItem>
              <div
                className={`w-full ${isCollapsedDonation ? "block" : "hidden"}`}
              >
                <List className="w-full">
                  <Link
                    to="Create_Donation"
                    className={`rounded-lg ${
                      location.pathname === "/dashboard/Create_Donation"
                        ? "bg-[#0A303A] text-white"
                        : ""
                    }`}
                  >
                    <ListItem>Create Donation Campaign</ListItem>
                  </Link>
                  <Link
                    to="myDonationCampaigns"
                    className={`rounded-lg ${
                      location.pathname === "/dashboard/myDonationCampaigns"
                        ? "bg-[#0A303A] text-white"
                        : ""
                    }`}
                  >
                    <ListItem>My Donation Campaign</ListItem>
                  </Link>
                  <Link
                    to="myDonation"
                    className={`rounded-lg ${
                      location.pathname === "/dashboard/myDonation"
                        ? "bg-[#0A303A] text-white"
                        : ""
                    }`}
                  >
                    <ListItem>My Donation</ListItem>
                  </Link>
                  <Link
                    to="MyRefund"
                    className={`rounded-lg ${
                      location.pathname === "/dashboard/MyRefund"
                        ? "bg-[#0A303A] text-white"
                        : ""
                    }`}
                  >
                    <ListItem>My Refund History</ListItem>
                  </Link>
                </List>
              </div>
              {Admin && (
                <>
                  <Link
                    to="Users"
                    className={`rounded-lg ${
                      location.pathname === "/dashboard/Users"
                        ? "bg-[#0A303A] text-white"
                        : ""
                    }`}
                  >
                    <ListItem>Users</ListItem>
                  </Link>
                  <Link
                    to="AllPets"
                    className={`rounded-lg ${
                      location.pathname === "/dashboard/AllPets"
                        ? "bg-[#0A303A] text-white"
                        : ""
                    }`}
                  >
                    <ListItem>All Pets</ListItem>
                  </Link>
                  <Link
                    to="AllDonation"
                    className={`rounded-lg ${
                      location.pathname === "/dashboard/AllDonation"
                        ? "bg-[#0A303A] text-white"
                        : ""
                    }`}
                  >
                    <ListItem>All Donation</ListItem>
                  </Link>
                </>
              )}
            </List>
          </Drawer>
        </div>
        {/* side content */}
        <div className="w-full overflow-hidden">
          {/* Top nav bar */}
          <div className="w-full flex flex-row justify-between items-center  p-3 bg-gray-300 text-lg">
            <button
              className="text-2xl text-[#000000]"
              onClick={() => {
                open ? closeDrawer() : openDrawer();
              }}
            >
              {open ? <RiMenuFoldFill /> : <RiMenuFold2Fill />}
            </button>

            {/* profile menu */}
            <div className="block">
              <ProfileMenu />
            </div>
          </div>

          {/* outlet */}
          <div className={`${open ? "px-3" : "px-2"} py-1`}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardRoot;
