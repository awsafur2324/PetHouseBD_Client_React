import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://pethousebd-server-nodejs.onrender.com",
});
const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
