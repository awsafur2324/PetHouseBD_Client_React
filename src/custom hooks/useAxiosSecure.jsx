import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthProvider } from "../contextProvider/ContextProvider";
import { toast } from "react-toastify";

const axios_Config = axios.create({
  baseURL: "https://pethousebd-server-nodejs.onrender.com",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { logOut, setOpenLogIn } = useContext(AuthProvider);

  useEffect(() => {
    axios_Config.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
      
        if (error?.response?.status == 401 || error?.response?.status == 403) {
            logOut().then(() => {
            toast.error("Session Expired! Please Login Again.");
            setOpenLogIn(true);
          });
        }
      }
    );
  }, [logOut,setOpenLogIn]);
  return axios_Config;
};

export default useAxiosSecure;
