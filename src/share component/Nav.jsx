import PropTypes from "prop-types";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { TiWeatherSunny } from "react-icons/ti";
import { IoMoonOutline } from "react-icons/io5";
import { MdPets } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { ChevronDownIcon, PowerIcon } from "@heroicons/react/24/solid";

import logo from "../assets/logo/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { createElement, useContext, useEffect, useState } from "react";
import { AuthProvider } from "../contextProvider/ContextProvider";
import useFindAdmin from "../custom hooks/useFindAdmin";

const Nav = ({ setTheme, theme }) => {
  // Admin
  const [Admin, AdminLoading] = useFindAdmin();

  // log in pop up
  const { handelLogin, user, logOut } = useContext(AuthProvider);
  // path location
  const petActive = useLocation().pathname;
  // ---------------profile menu component
  const profileMenuItems = [
    {
      label: "Dashboard",
      icon: LuLayoutDashboard,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];

  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src={user?.photoURL}
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <>
                {user && !AdminLoading && !Admin && (
                  <Link
                    to={`${label === "Dashboard" ? "/dashboard/userDashboard" : petActive}`}
                    key={label}
                    onClick={() => {
                      closeMenu();
                      if (label === "Sign Out") {
                        logOut();
                      }
                    }}
                    className="outline-none"
                  >
                    <MenuItem
                      className={`flex items-center gap-2 rounded ${
                        isLastItem
                          ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                          : ""
                      }`}
                    >
                      {createElement(icon, {
                        className: `h-4 w-4 ${
                          isLastItem ? "text-red-500" : ""
                        }`,
                        strokeWidth: 2,
                      })}
                      <Typography
                        as="span"
                        variant="small"
                        className="font-normal"
                        color={isLastItem ? "red" : "inherit"}
                      >
                        {label}
                      </Typography>
                    </MenuItem>
                  </Link>
                )}
                {user && !AdminLoading && Admin && (
                  <Link
                    to={`${label === "Dashboard" ? "/dashboard/AdminDashboard" : petActive}`}
                    key={label}
                    onClick={() => {
                      closeMenu();
                      if (label === "Sign Out") {
                        logOut();
                      }
                    }}
                    className="outline-none"
                  >
                    <MenuItem
                      className={`flex items-center gap-2 rounded ${
                        isLastItem
                          ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                          : ""
                      }`}
                    >
                      {createElement(icon, {
                        className: `h-4 w-4 ${
                          isLastItem ? "text-red-500" : ""
                        }`,
                        strokeWidth: 2,
                      })}
                      <Typography
                        as="span"
                        variant="small"
                        className="font-normal"
                        color={isLastItem ? "red" : "inherit"}
                      >
                        {label}
                      </Typography>
                    </MenuItem>
                  </Link>
                )}
              </>
            );
          })}
        </MenuList>
      </Menu>
    );
  }

  //---------------navbar component
  function NavList() {
    return (
      <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 myActive ">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1  dark:text-gray-400"
        >
          <NavLink
            to="/"
            // className={` `}
            className={({ isActive }) =>
              isActive
                ? `text-[#FBAE02] font-bold flex flex-row justify-start lg:justify-center items-stretch gap-[1px] `
                : " hover:text-[#FBAE02] hover:font-bold font-display1 transition-colors"
            }
          >
            <MdPets
              className={`text-lg ${
                petActive === "/" ? "hidden lg:block" : "hidden"
              }`}
            />{" "}
            Home
          </NavLink>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1  dark:text-gray-400"
        >
          <NavLink
            to="/PetList"
            className={({ isActive }) =>
              isActive
                ? `text-[#FBAE02] font-bold flex flex-row justify-start lg:justify-center items-stretch gap-[1px] `
                : " hover:text-[#FBAE02] hover:font-bold font-display1 transition-colors flex flex-row justify-start lg:justify-center items-stretch gap-[1px]"
            }
          >
            <MdPets
              className={`text-lg ${
                petActive === "/PetList" ? "block" : "hidden"
              }`}
            />
            Pet List
          </NavLink>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 dark:text-gray-400"
        >
          <NavLink
            to="/campaign"
            className={({ isActive }) =>
              isActive
                ? `text-[#FBAE02] font-bold flex flex-row justify-start lg:justify-center items-stretch gap-[1px]`
                : " hover:text-[#FBAE02] hover:font-bold font-display1 transition-colors flex flex-row justify-start lg:justify-center items-stretch gap-[1px]"
            }
          >
            {" "}
            <MdPets
              className={`text-lg ${
                petActive === "/campaign" ? "block" : "hidden"
              }`}
            />
            Donation Campaigns
          </NavLink>
        </Typography>
      </ul>
    );
  }

  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto w-full max-w-full px-6 py-1 sticky z-50 top-0  shadow-md rounded-none dark:bg-dark dark:border-none dark:shadow-lg ">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 w-32"
        >
          <img
            src={logo}
            alt=""
            width={"100%"}
            height={"100%"}
            className="object-cover"
          />
        </Typography>

        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="flex flex-row justify-center items-center gap-3">
          {/* theme */}
          <div className="flex flex-row justify-center items-center">
            <button
              onClick={() => {
                setTheme("dark");
              }}
              className={`text-xl ${
                theme === "light" ? "text-black block" : "hidden"
              }`}
            >
              <TiWeatherSunny />
            </button>
            <button
              onClick={() => {
                setTheme("light");
              }}
              className={`text-xl ${
                theme === "dark" ? "text-white block" : "hidden"
              }`}
            >
              <IoMoonOutline />
            </button>
          </div>
          {user ? (
            <div className="block">
              {/* user profile */}
              <ProfileMenu />
            </div>
          ) : (
            <button
              onClick={handelLogin}
              className="relative inline-block text-sm group"
            >
              {/* log in */}
              <span className="relative z-10 block px-4 py-2 overflow-hidden font-medium leading-tight text-green-600 transition-colors duration-300 ease-out border-2 border-green-600 rounded-lg group-hover:text-white dark:border-none">
                <span className="absolute inset-0 w-full h-full px-4 py-2 rounded-lg bg-gray-50 "></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-green-600 group-hover:-rotate-180 ease"></span>
                <span className="relative">Log In</span>
              </span>
            </button>
          )}

          {/* berger */}
          <IconButton
            variant="text"
            className=" text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
};
Nav.propTypes = {
  setTheme: PropTypes.any,
  theme: PropTypes.any,
};
export default Nav;
