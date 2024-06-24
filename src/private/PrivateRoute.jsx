import { useContext } from "react";
import { AuthProvider } from "../contextProvider/ContextProvider";
import PropTypes from "prop-types";
const PrivateRoute = ({ children }) => {
  const { user, isLoading, setOpenLogIn } = useContext(AuthProvider);

  if (isLoading) {
    return;
  }

  if (user) {
    return children;
  }

  return setOpenLogIn(true);
};

PrivateRoute.propTypes = {
  children: PropTypes.any,
};
export default PrivateRoute;
