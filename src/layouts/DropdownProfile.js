import "flowbite";
import PictureUser from "../assets/blank.png";
import { FaHouseUser } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { updateStatusShowUser } from "../apis/admin-api";
import { formatTime } from "../utils/formatTime ";
import { getUserInfoById } from "../apis/user-api";

export default function DropdownProfile() {
  const { logout, authenticateUser, setAuthenticatedUser, getUsers } =
    useAuth();
  // console.log("authenticateUser:", authenticateUser);
  console.log("getUsers:", getUsers);

  const [getUserData, setGetUserData] = useState([]);
  // console.log("getUserData:", getUserData);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const menuRef = useRef();
  const imgRef = useRef();

  window.addEventListener("click", e => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });

  useEffect(() => {
    const fetchUserInfoById = async () => {
      try {
        let userIdToFetch;

        if (authenticateUser && authenticateUser.id) {
          userIdToFetch = authenticateUser.id;
        } else {
          console.error(
            "Neither selectedProfileId nor authenticateUser is available"
          );
          return;
        }
        // console.log("userIdToFetch:", userIdToFetch);
        const res = await getUserInfoById(userIdToFetch);
        // Update getUserData based on the response
        setGetUserData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserInfoById();
  }, [authenticateUser]);

  useEffect(() => {
    let timer;

    const fetchData = async () => {
      if (
        authenticateUser &&
        authenticateUser?.status === "BANUSER" &&
        authenticateUser?.startBanDate &&
        authenticateUser?.endBanDate
      ) {
        const startTime = new Date(authenticateUser?.startBanDate).getTime();
        const endTime = new Date(authenticateUser?.endBanDate).getTime();

        // console.log("startTime:", startTime);
        // console.log("endTime:", endTime);

        if (!isNaN(startTime) && !isNaN(endTime) && endTime > startTime) {
          setCountdown(prevCountdown =>
            Math.floor((endTime - startTime) / 1000)
          );

          timer = setInterval(() => {
            setCountdown(prevCountdown => {
              const newCountdown = prevCountdown > 0 ? prevCountdown - 1 : 0;

              if (newCountdown === 0) {
                clearInterval(timer);
              }

              if (newCountdown === 0) {
                clearInterval(timer);
                updateStatusShowUser(
                  authenticateUser?.id,
                  formatTime(newCountdown)
                );
              }

              return newCountdown;
            });
          }, 1000);
        }
      }
    };

    fetchData();

    return () => {
      clearInterval(timer);
    };
  }, [authenticateUser, setAuthenticatedUser]);

  return (
    <div className="flex w-4/12 justify-end items-center gap-4">
      {/* BOX-left */}
      <div className="flex justify-center items-center gap-4">
        {authenticateUser && authenticateUser.status === "BANUSER" ? (
          countdown > 0 ? (
            <button
              type="button"
              className="text-white bg-red-700 opacity-50 cursor-not-allowed rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:opacity-50"
              disabled
            >
              Banned for: {formatTime(countdown)} Remaining
            </button>
          ) : (
            <Link to="createPostPage">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create Post
              </button>
            </Link>
          )
        ) : (
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
            src={authenticateUser?.profileImage || PictureUser}
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
                {authenticateUser?.firstName} {authenticateUser?.lastName}
              </span>
              <div className="font-medium truncate">
                {" "}
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                  {authenticateUser?.email}
                </span>
              </div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="avatarButton"
            >
              {authenticateUser && authenticateUser?.isAdmin === true ? null : (
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

              {authenticateUser && authenticateUser?.isAdmin === true ? (
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
