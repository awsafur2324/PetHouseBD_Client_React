import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  IconButton,
} from "@material-tailwind/react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Nav from "../share component/Nav";
import { createContext, useContext, useEffect, useState } from "react";
import Footer from "../share component/Footer";
import { AuthProvider } from "../contextProvider/ContextProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase.config";

export const ThemeContext = createContext();
const Root = () => {
  // context provider
  const {
    openLogIn,
    handelLogin,
    loginWithGoogle,
    loginWithGithub,
    signInUser,
    createUser,
  } = useContext(AuthProvider);
  // login next process
  const navigate = useNavigate();
  const location = useLocation();

  //pet's list category
  const [PetCategory , setPetCategory] = useState("")

  //imgbb Api
  const imgAPIKey = import.meta.env.VITE_IMG_API_KEY;
  // const imgAPIKey = "592097d871a6f51d4d6c14d7e7008cb6";

  //theme control
  const localTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(localTheme);

  useEffect(() => {
    if (localTheme == null) {
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      setTheme(localTheme);
    }
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }, [theme, localTheme]);

  //sign up pop up
  const [opensignUp, setOpenSignUp] = useState(false);
  const handelSignup = () => {
    setOpenSignUp(!opensignUp);
  };
  //password handel
  const [showPassword, setShowPassword] = useState(false);
  const handelPassword = () => setShowPassword(!showPassword);

  //handel log in
  const AfterClickLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.pass.value;
    signInUser(email, password)
      .then(() => {
        //we can check the user is verified his email or not ..if verify then we set him
        //Now reset the input field
        e.target.reset();
        navigate(location?.state ? `${location.state}` : "/");
        toast.success("Log in successfully");
        handelLogin();
      })
      .catch(() => {
        toast.error("Log in failed");
        handelLogin();
      });
  };

  //handel Sign up
  const AfterClickSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.pass.value;
    const name = e.target.name.value;
    const photo = e.target.photo.files[0];
    
    const formData = new FormData();
    formData.append("image", photo);
    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData,
      {
        params: {
          key: imgAPIKey, // Replace with your actual API key
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const img = response.data.data.display_url;
    if (img) {
      createUser(email, password)
        .then(() => {
          //Add user name in the firebase - using updateProfile
          updateProfile(auth.currentUser, { displayName: name, photoURL: img });
          //Now reset the input field
          e.target.reset();
          toast.success("Sign up successfully");
          handelSignup();
        })
        .catch(() => toast.error("Sign up failed"));
    }
  };
  return (
    <div className="bg-white dark:bg-[#1D232A] dark:text-white">
      <Nav setTheme={setTheme} theme={theme} />
      <div className="relative z-10 bg-white dark:bg-[#1D232A] mb-16 md:mb-80">
        <ThemeContext.Provider value={{ theme , setPetCategory , PetCategory}}>
          <Outlet />
        </ThemeContext.Provider>
      </div>
      <Footer />
      {/* log in pop up */}
      <Dialog
        size="xs"
        open={openLogIn}
        handler={handelLogin}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Sign In
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your email and password to Sign In.
            </Typography>
            <form onSubmit={AfterClickLogIn} className="flex flex-col gap-4">
              <Typography className="-mb-2" variant="h6">
                Your Email
              </Typography>
              <Input
                type="email"
                label="Email"
                name="email"
                size="lg"
                required
              />
              <Typography className="-mb-2" variant="h6">
                Your Password
              </Typography>
              <Input
                name="pass"
                type={showPassword ? "text" : "password"}
                label="Password"
                size="lg"
                required
                icon={
                  <button onClick={handelPassword}>
                    {showPassword ? <LuEyeOff /> : <LuEye />}
                  </button>
                }
              />

              <div className="-ml-2.5 -mt-3">
                <Checkbox label="Remember Me" />
              </div>
              <Button type="submit" variant="gradient" fullWidth>
                Log In
              </Button>
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex flex-row justify-center items-center gap-5 my-3">
              <IconButton
                onClick={() =>
                  loginWithGoogle().then(() => {
                    handelLogin();
                    toast.success("login successfully");
                  })
                }
                title="log in with google"
                className="rounded bg-[#ea4335] hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10"
              >
                <FaGoogle />
              </IconButton>
              <IconButton
                onClick={() => {
                  loginWithGithub().then(() => {
                    handelLogin();
                    toast.success("login successfully");
                  });
                }}
                title="log in with github"
                className="rounded bg-[#333333] hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10"
              >
                <FaGithub />
              </IconButton>
            </div>
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold hover:text-green-600"
                onClick={() => {
                  handelSignup();
                  handelLogin();
                }}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>

      {/* Sign UP */}
      <Dialog
        size="xs"
        open={opensignUp}
        handler={handelSignup}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem] max-h-[85vh] overflow-y-scroll scrollCustomize">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Sign Up
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Register in our platform.
            </Typography>
            <form onSubmit={AfterClickSignUp} className="flex flex-col gap-4">
              <Typography className="-mb-2" variant="h6">
                Your Photo
              </Typography>
              <Input
                type="file"
                name="photo"
                accept="image/jpeg, image/png"
                label="Photo"
                size="lg"
                required
              />
              <Typography className="-mb-2" variant="h6">
                Your Full Name
              </Typography>
              <Input
                type="text"
                name="name"
                label="Full Name"
                size="lg"
                required
              />
              <Typography className="-mb-2" variant="h6">
                Your Email
              </Typography>
              <Input
                type="email"
                name="email"
                label="Email"
                size="lg"
                required
              />
              <Typography className="-mb-2" variant="h6">
                Your Password
              </Typography>
              <Input
                name="pass"
                type={showPassword ? "text" : "password"}
                label="Password"
                size="lg"
                pattern="^.{6,}$"
                title="Please Enter At least 6 characters"
                required
                placeholder="Please Enter At least 6 characters"
                icon={
                  <button onClick={handelPassword}>
                    {showPassword ? <LuEyeOff /> : <LuEye />}
                  </button>
                }
              />

              <div className="-ml-2.5 -mt-3">
                <Checkbox label="Remember Me" />
              </div>
              <Button type="submit" variant="gradient" fullWidth>
                Sign Up
              </Button>
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <Typography variant="small" className="mt-4 flex justify-center">
              Already have a account. Then
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold hover:text-green-600"
                onClick={() => {
                  handelLogin();
                  handelSignup();
                }}
              >
                Log In
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};

export default Root;
