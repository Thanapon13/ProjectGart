import { Link, useNavigate } from "react-router-dom";
import DropdownProfile from "./DropdownProfile";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

export default function Header() {
  const { authenticateUser } = useAuth();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  // console.log("searchInput:", searchInput);
  const handleSearch = e => {
    e.preventDefault();
    setSearchInput("");
  };

  return (
    <div className="h-[100px] w-full border border-b-slate-200 ">
      <nav className="w-fll h-full flex bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        {/* BOX-1 left */}
        <div className="container flex justify-start items-center gap-6">
          {/* logo */}
          <div className="flex justify-center items-center gap-4">
            <Link to="/">
              <img
                src="https://media.discordapp.net/attachments/1085571217563602965/1184558226524606484/logo.png?ex=658c68d1&is=6579f3d1&hm=d670f14d99d90562d0c83cea83d03cf736ce3ec680862acb943aaebc443f9854&=&format=webp&quality=lossless&width=1000&height=500"
                className="w-[80px] h-[80px] object-cover rounded-full border-2"
                alt="Flowbite Logo"
              />
            </Link>
            {/* <Link to="/tagPage">
              <p className="self-center text-lg font-semibold whitespace-nowrap dark:text-white hover:underline">
                Tag
              </p>
            </Link> */}
          </div>

          <form
            className="w-8/12"
            onSubmit={e => {
              e.preventDefault();
              navigate("/", { state: searchInput });
            }}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>

              <div className="block border-2 w-full h-10 flex items-center justify-between text-sm text-gray-900 rounded-full bg-gray-50 focus:outline-none focus:ring-0">
                <input
                  type="search"
                  id="default-search"
                  className="border-none focus:ring-0 bg-gray-50 border-2 w-full rounded-full"
                  placeholder="Search Post name or Tag name..."
                  required
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                />

                {/* ปุ่ม Search ไม่จำเป็นต้องมีแล้ว */}
              </div>
            </div>
          </form>
        </div>

        {/* BOX-2 right */}

        {authenticateUser ? (
          <DropdownProfile />
        ) : (
          <div className="w-1/4 flex justify-center items-center gap-4 ">
            <Link to="/loginPage">
              <button
                type="button"
                className="text-back border border-slate-950 hover:bg-gray-200 focus:outline-none focus:ring-0 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Log In
              </button>
            </Link>

            <Link to="/rejisterPage">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
