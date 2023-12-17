import "flowbite";
import PictureUser from "../assets/blank.png";
import { FaHouseUser } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { useRef, useState } from "react";

export default function DropdownProfile() {
  const { logout, authenticateUser } = useAuth();
  // console.log("authenticateUser:", authenticateUser);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const menuRef = useRef();
  const imgRef = useRef();

  window.addEventListener("click", e => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });

  return (
    <div className="flex w-4/12 justify-end items-center gap-4">
      {/* BOX-left */}
      <div className="flex justify-center items-center gap-4">
        {authenticateUser && authenticateUser.isAdmin === true ? null : (
          <Link to="createPostPage">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Post
            </button>
          </Link>
        )}
      </div>

      {/* BOX-right */}
      <div className="relative">
        {authenticateUser ? (
          <img
            ref={imgRef}
            type="button"
            className="w-10 h-10 rounded-full cursor-pointer"
            src={authenticateUser.profileImage || PictureUser}
            alt="User dropdown"
            onClick={() => setOpen(!open)}
          />
        ) : (
          <img
            ref={imgRef}
            type="button"
            className="w-10 h-10 rounded-full cursor-pointer"
            src={PictureUser}
            alt="User dropdown"
            onClick={() => setOpen(!open)}
          />
        )}

        {open && (
          <div
            ref={menuRef}
            className="absolute z-10 -left-40 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <span className="block text-sm text-gray-900 dark:text-white">
                {authenticateUser.firstName} {authenticateUser.lastName}
              </span>
              <div className="font-medium truncate">
                {" "}
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                  {authenticateUser.email}
                </span>
              </div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="avatarButton"
            >
              {authenticateUser && authenticateUser.isAdmin === true ? null : (
                <li>
                  <Link
                    to="/profilePage"
                    className="flex items-center gap-3 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <i>
                      <FaHouseUser />
                    </i>
                    <p>User account</p>
                  </Link>
                </li>
              )}

              {authenticateUser && authenticateUser.isAdmin === true ? (
                <li>
                  <Link
                    to="/adminPage"
                    className="flex items-center gap-3 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <i>
                      <RiAdminFill />
                    </i>
                    <p>Admin</p>
                  </Link>
                </li>
              ) : null}
            </ul>
            <div className="py-1">
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="w-full flex items-center gap-3 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <i>
                  <MdLogout />
                </i>
                <p>Log out</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
