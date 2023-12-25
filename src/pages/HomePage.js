import { Link, useLocation, useNavigate } from "react-router-dom";
import usePost from "../hooks/usePost";
import CardPost from "../components/CardPost";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { BiSolidLike } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import ButtonClear from "../components/ButtonClear";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { CgPushChevronLeft } from "react-icons/cg";
import { CgPushChevronRight } from "react-icons/cg";

export default function HomePage() {
  const { postData } = usePost();
  // console.log("postData:", postData);
  const navigate = useNavigate();
  const { authenticateUser } = useAuth();
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [sortByLikes, setSortByLikes] = useState(false);
  const [viewMyPosts, setViewMyPosts] = useState(false);
  const [getSearch, setGetSearch] = useState(null);
  const [searchedPosts, setSearchedPosts] = useState([]);
  // console.log("getSearch:", getSearch);

  const toggleSortByLikes = () => {
    setSortByLikes(!sortByLikes);
    setViewMyPosts(false);
    setSelectedTagId(null);
    setSearchedPosts([]);
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      if (typeof location.state === "string") {
        setGetSearch(location.state);
        setSelectedTagId(location.state);
      } else if (typeof location.state === "object" && location.state.id) {
        setSelectedTagId(location.state.id);
        setGetSearch(location.state.id);
      } else {
        setSelectedTagId(null);
      }
    }
  }, [location.state]);

  const clearSearch = () => {
    setSelectedTagId(null);
    setGetSearch(null);
    setViewMyPosts(null);
    setSearchedPosts([]);
    navigate("/");
  };

  const filterAndSortPosts = () => {
    const filteredPosts = selectedTagId
      ? postData.filter(
          post =>
            post.Tag.TagName.toLowerCase() === selectedTagId.toLowerCase() ||
            post.title.toLowerCase().includes(getSearch.toLowerCase())
        )
      : viewMyPosts
      ? postData.filter(post => post.User.id === authenticateUser.id)
      : postData;

    const searchedPosts = getSearch
      ? filteredPosts.filter(post => {
          const titleLower = post.title.toLowerCase();
          const tagNameLower = post.Tag.TagName.toLowerCase();
          const searchLower = getSearch.toLowerCase();
          return (
            titleLower.includes(searchLower) ||
            tagNameLower.includes(searchLower)
          );
        })
      : filteredPosts;

    const sortedPosts = [...searchedPosts].sort((a, b) => {
      if (sortByLikes) {
        return b.Likes.length - a.Likes.length;
      } else {
        return b.id - a.id;
      }
    });

    setSearchedPosts(sortedPosts);
  };

  useEffect(() => {
    filterAndSortPosts();
  }, [selectedTagId, sortByLikes, viewMyPosts, getSearch, postData]);

  const clearAll = () => {
    setSelectedTagId(null);
    setGetSearch(null);
    setViewMyPosts(null);
    setSortByLikes(false);
    setSearchedPosts([]);
    navigate("/");
  };

  return (
    <div className="relative">
      <div className="w-full flex">
        <div className="w-1/5 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {authenticateUser ? (
              <li>
                <button
                  href="#"
                  className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group ${
                    viewMyPosts ? "bg-gray-300" : null
                  }`}
                  onClick={() => setViewMyPosts(!viewMyPosts)}
                >
                  <i>
                    <FaUser />
                  </i>
                  <span className="ms-3">Post</span>
                </button>
              </li>
            ) : null}

            <li>
              <button
                href="#"
                className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group ${
                  sortByLikes ? "bg-gray-300" : null
                }`}
                onClick={toggleSortByLikes}
              >
                <i>
                  <BiSolidLike />
                </i>
                <span className="ms-3">Likes</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="w-full">
          <div className="flex">
            <div className="p-2">
              {sortByLikes && (
                <ButtonClear onClick={toggleSortByLikes} title="Like" />
              )}
            </div>

            <div className="p-2">
              {getSearch && (
                <ButtonClear onClick={clearSearch} getSearch={getSearch} />
              )}
            </div>

            <div className="p-2">
              {viewMyPosts && (
                <ButtonClear onClick={clearSearch} getSearch="Posts" />
              )}
            </div>

            {viewMyPosts || getSearch || sortByLikes ? (
              <div className="p-2">
                <ButtonClear onClick={clearAll} title="Clear All" />
              </div>
            ) : null}
          </div>

          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-4 z-0">
            {searchedPosts?.length > 0 ? (
              searchedPosts?.map((el, idx) => <CardPost key={idx} el={el} />)
            ) : (
              <p className="flex items-start justify-center h-screen text-center text-gray-600 dark:text-gray-300 mt-4">
                No results found for "{`${getSearch || "Post"}`}".
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 h-12 pr-2 items-center text-text-black-table text-xs font-semibold bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
        <div className="flex items-center">
          <div>Rows per page:</div>
          <select
            id="limit"
            name="limit"
            className="h-8 ml-2 bg-gray-50  border border-gray-300  text-gray-500 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            // onChange={handlePaginationSearch}
          >
            <option value="5">5</option>
            <option value="10" selected="selected">
              10
            </option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div className="mx-5">
          {/* {search.limit * (search.page - 1) + 1}-
                  {search.limit * (search.page - 1) + assetList.length} of{" "}
                  {search.total} */}
        </div>

        <button
          className="flex justify-center items-center hover:bg-gray-200 rounded-full  text-icon-dark-gray focus:text-black w-6 h-6 px-1 my-2"
          // onClick={handleFirstPage}
        >
          <CgPushChevronLeft className="text-lg" />
        </button>
        <button
          className="flex justify-center items-center hover:bg-gray-200 rounded-full  text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1"
          // onClick={handlePageDecrease}
        >
          <HiChevronLeft className="text-lg" />
        </button>
        <button
          className="flex justify-center items-center hover:bg-gray-200 rounded-full text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1"
          // onClick={handlePageIncrease}
        >
          <HiChevronRight className="text-lg" />
        </button>
        <button
          className="flex justify-center items-center hover:bg-gray-200 rounded-full text-icon-dark-gray focus:text-black w-6 h-6 px-1 py-1"
          // onClick={handleLastPage}
        >
          <CgPushChevronRight className="text-lg font-bold" />
        </button>
      </div>
    </div>
  );
}
