import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext, useState } from "react";
import { AuthProvider } from "../contextProvider/ContextProvider";


const useQueryMyPets = (pathName) => {
  const [itemParPage, setItemPerPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
    const {user , isLoading}= useContext(AuthProvider)
    const AxiosSecure = useAxiosSecure();
    const {data: myPets , isLoading: myPetsLoading , refetch } = useQuery({
        queryKey: [user?.email , "myAddedPets" , currentPage, itemParPage, pathName],
        enabled: !isLoading,
        queryFn: async () => {
          const res = await AxiosSecure.get(`/${pathName}/${user?.email}?page=${currentPage}&limit=${itemParPage}`);
          return res.data;
        },
      });
      return {myPets , refetch , myPetsLoading , itemParPage ,setItemPerPages, currentPage, setCurrentPage}
};

export default useQueryMyPets;