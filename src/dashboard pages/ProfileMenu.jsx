import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Typography,
  MenuItem,
  MenuList,
  Avatar,
  Menu,
  MenuHandler,
} from "@material-tailwind/react";
import { createElement, useContext, useState } from "react";
import { GrUserSettings } from "react-icons/gr";
import { HiOutlineHome } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { AuthProvider } from "../contextProvider/ContextProvider";
//for profile
const profileMenuItems = [
  {
    label: "Back To Home",
    icon: HiOutlineHome,
  },
  {
    label: "Manage Profile ",
    icon: GrUserSettings,
  },

];

function ProfileMenu() {
  const {user} = useContext(AuthProvider)
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
        {profileMenuItems.map(({ label, icon }) => {
          return ( 
            <Link
              to={`${label === "Back To Home" ? "/" : "/profile"}`}
              key={label}
              onClick={closeMenu}
              className="outline-none"
            >
              <MenuItem className={`flex items-center gap-2 rounded `}>
                {createElement(icon, {
                  className: `h-4 w-4 `,
                  strokeWidth: 2,
                })}
                <Typography as="span" variant="small" className="font-normal">
                  {label}
                </Typography>
              </MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default ProfileMenu;
