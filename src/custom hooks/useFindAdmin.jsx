import { useContext } from "react";
import { AuthProvider } from "../contextProvider/ContextProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useFindAdmin = () => {
  const { user, isLoading } = useContext(AuthProvider);
  const axios_Config = useAxiosSecure();
  const { data: Admin, isPending: AdminLoading } = useQuery({
    queryKey: [user?.email, "Admin"],
    enabled: !isLoading, //it's means the next part is waiting for loading
    queryFn: async () => {
      if (!user?.email) return;
      const data = await axios_Config.get(`/Check_Admin/${user?.email}`);
      return data.data?.IsAdmin;
    },
  });

  return [Admin, AdminLoading];
};

export default useFindAdmin;
