import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../../firebase.config";
import { toast } from "react-toastify";
import useAxios from "../custom hooks/useAxios";
import Swal from "sweetalert2";

export const AuthProvider = createContext(null);
const ContextProvider = ({ children }) => {
  const axiosPublic = useAxios();

  //for log in pop up
  const [openLogIn, setOpenLogIn] = useState(false);
  const handelLogin = () => setOpenLogIn(!openLogIn);

  //loading state
  const [isLoading, setIsLoading] = useState(true);
  //user state
  const [user, setUser] = useState(null);

  //Register part with email & password
  const createUser = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //Log in part with email & password
  const signInUser = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //======================================Google
  //create a google provider
  const googleProvider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then()
      .catch((error) => alert(error.code));
  };

  //====================================Github log in
  const githubProvider = new GithubAuthProvider();
  const loginWithGithub = () => {
    setIsLoading(true);
    return signInWithPopup(auth, githubProvider)
      .then()
      .catch((error) => alert(error.code));
  };

  // Observe the user state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      //Here we set the current user who log in in this system
      setUser(currentUser);

      const userEmail = currentUser?.email || user?.email;

      //====================  here we work for jwt token ===================
      if (currentUser) {
        //------------------ Check Ban user
        axiosPublic.get(`/userStatus/${userEmail}`).then((res) => {
          if (res.data.Status === "Ban") {
            signOut(auth).then(() => {
              Swal.fire({
                position: "top",
                icon: "error",
                title: "You Account Was Ban",
                text: "Contact with Administrator",
                timer: 6000,
                showConfirmButton: false,
                toast: true,
              });
              setIsLoading(false);
            });
          } else {
            //set jwt token
            axiosPublic
              .post(
                "/jwt",
                { email: userEmail },
                {
                  withCredentials: true,
                }
              ) //withCredential means to set the cooke
              .then((res) => {
                if (res.data.success) {
                  // insert the user data to the database
                  const userData = {
                    name: currentUser?.displayName,
                    email: currentUser?.email,
                    profilePic: currentUser?.photoURL,
                    role: "user",
                    Create_Date: currentUser.metadata.createdAt,
                    LastLogin_Date: currentUser.metadata.lastLoginAt,
                    Status: "Active",
                  };
                  axiosPublic.post("/registerUsers", userData);
                  setIsLoading(false);
                }
              });
          }
        });
      } else {
        axiosPublic
          .post("/logout", { email: userEmail }, { withCredentials: true })
          .then(() => {
            setIsLoading(false);
          });
      }
    });
    return () => unSubscribe();
  }, [user?.email, axiosPublic]);

  //sign out a user
  const logOut = () => {
    setIsLoading(true);
    return signOut(auth)
      .then(() => toast.success("Sign out successful"))
      .catch(() => toast.error("Log out failed . Try again!"));
  };

  const data = {
    openLogIn,
    setOpenLogIn,
    handelLogin,
    isLoading,
    user,
    createUser,
    signInUser,
    loginWithGoogle,
    loginWithGithub,
    logOut,
  };

  return <AuthProvider.Provider value={data}>{children}</AuthProvider.Provider>;
};
ContextProvider.propTypes = {
  children: PropTypes.any,
};
export default ContextProvider;
