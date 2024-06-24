/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthProvider } from "../contextProvider/ContextProvider";
import useFindAdmin from "../custom hooks/useFindAdmin";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";


const AdminPrivateRoute = ({children}) => {
    const {user , isLoading} = useContext(AuthProvider);
    const [Admin , AdminLoading] = useFindAdmin();
    const navigate = useNavigate();
    if(isLoading || AdminLoading){
        return <Skeleton height={"50px"} width={"100%"} count={5}/>
    }
     if(user && Admin){
        return children
     }

     return navigate("/dashboard/userDashboard")

};

export default AdminPrivateRoute;