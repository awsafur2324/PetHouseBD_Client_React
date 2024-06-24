import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../Pages/home/Home";
import PetList from "../Pages/petsList/PetList";
import PetDetails from "../Pages/petDetails/PetDetails";
import DonationCamp from "../Pages/donationCamp/DonationCamp";
import DonateDetails from "../Pages/donateetails/DonateDetails";

import DashboardRoot from "../dashboard pages/DashboardRoot";
import PrivateRoute from "../private/PrivateRoute";
import UserHome from "../dashboard pages/user Dashboard/UserHome";
import AddPet from "../dashboard pages/user Dashboard/AddPet";
import MyAddedPets from "../dashboard pages/user Dashboard/MyAddedPets";
import PetsUpdate from "../dashboard pages/user Dashboard/PetsUpdate";
import AdoptionRequest from "../dashboard pages/user Dashboard/AdoptionRequest";
import CreateDonation from "../dashboard pages/user Dashboard/CreateDonation";
import MyDonationCamp from "../dashboard pages/user Dashboard/MyDonationCamp";
import MyDonationUpdate from "../dashboard pages/user Dashboard/MyDonationUpdate";
import AcceptRequest from "../dashboard pages/user Dashboard/AcceptRequest";
import RequestStatus from "../dashboard pages/user Dashboard/RequestStatus";
import MyDonation from "../dashboard pages/user Dashboard/MyDonation";
import MyRefund from "../dashboard pages/user Dashboard/MyRefund";
import AdminHome from "../dashboard pages/AdminDashboard/AdminHome";
import AdminPrivateRoute from "../private/AdminPrivateRoute";
import Users from "../dashboard pages/AdminDashboard/Users";
import AllPets from "../dashboard pages/AdminDashboard/AllPets";
import AllDonation from "../dashboard pages/AdminDashboard/AllDonation";
import Error from "../Error Element/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/PetList",
        element: <PetList />,
      },
      {
        path: "/petDetails/:id",
        element: (
          <PrivateRoute>
            <PetDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/campaign",
        element: <DonationCamp />,
      },
      {
        path: "/donateDetails/:id",
        element: <PrivateRoute><DonateDetails /></PrivateRoute>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardRoot />,
    errorElement: <Error />,
    children: [
      {
        path: "userDashboard",
        element: <PrivateRoute><UserHome /></PrivateRoute>,
      },
      {
        path: "addPet",
        element: (
          <PrivateRoute>
            <AddPet />
          </PrivateRoute>
        ),
      },
      {
        path: "myAddedPets",
        element: (
          <PrivateRoute>
            <MyAddedPets />
          </PrivateRoute>
        ),
      },
      {
        path: "PetsUpdate/:id",
        element: (
          <PrivateRoute>
            <PetsUpdate />
          </PrivateRoute>
        ),
      },
      {
        path: "AdoptionRequest",
        element: <PrivateRoute><AdoptionRequest /></PrivateRoute>,
      },
      {
        path: "Create_Donation",
        element: <PrivateRoute><CreateDonation /></PrivateRoute>,
      },
      {
        path: "myDonationCampaigns",
        element: <PrivateRoute><MyDonationCamp /></PrivateRoute>,
      },
      {
        path: "myDonationUpdate/:id",
        element: <PrivateRoute><MyDonationUpdate /></PrivateRoute>,
      },
      {
        path: "AcceptedRequest",
        element: <PrivateRoute><AcceptRequest /></PrivateRoute>,
      },
      {
        path: "RequestStatus",
        element: <PrivateRoute><RequestStatus /></PrivateRoute>,
      },
      {
        path: "myDonation",
        element: <PrivateRoute><MyDonation /></PrivateRoute>,
      },
      {
        path : "MyRefund",
        element : <PrivateRoute><MyRefund /></PrivateRoute>
      },
      //only Admin can access dashboard
      {
        path : "AdminDashboard",
        element : <AdminPrivateRoute><AdminHome /></AdminPrivateRoute>
      },
      {
        path : "Users",
        element : <AdminPrivateRoute><Users /></AdminPrivateRoute>
      },
      {
        path : "AllPets",
        element : <AdminPrivateRoute><AllPets /></AdminPrivateRoute>
      },
      {
        path : "AllDonation",
        element : <AdminPrivateRoute><AllDonation /></AdminPrivateRoute>
      }
    ],
  },
]);

export default router;
