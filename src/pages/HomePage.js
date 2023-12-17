import { Link, useLocation, useNavigate } from "react-router-dom";
import usePost from "../hooks/usePost";
import CardPost from "../components/CardPost";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { BiSolidLike } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import ButtonClear from "../components/ButtonClear";

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
    setSearchedPosts([]); // รีเซ็ตค่าที่ค้นหาเมื่อเปลี่ยนเงื่อนไขการแสดง
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
    setSearchedPosts([]); // รีเซ็ตค่าที่ค้นหาเมื่อกดปุ่ม Clear
    navigate("/");
  };

  // const filterAndSortPosts = () => {
  //   const filteredPosts = selectedTagId
  //     ? postData.filter(
  //         post =>
  //           post.Tag.TagName === selectedTagId || post.title.includes(getSearch)
  //       )
  //     : viewMyPosts
  //     ? postData.filter(post => post.User.id === authenticateUser.id)
  //     : postData;

  //   const searchedPosts = getSearch
  //     ? filteredPosts.filter(post => {
  //         const titleLower = post.title.toLowerCase();
  //         const tagNameLower = post.Tag.TagName.toLowerCase();
  //         const searchLower = getSearch.toLowerCase();
  //         return (
  //           titleLower.includes(searchLower) ||
  //           tagNameLower.includes(searchLower)
  //         );
  //       })
  //     : filteredPosts;

  //   const sortedPosts = [...searchedPosts].sort((a, b) => {
  //     if (sortByLikes) {
  //       return b.Likes.length - a.Likes.length;
  //     } else {
  //       return b.id - a.id;
  //     }
  //   });

  //   setSearchedPosts(sortedPosts);
  // };

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
      {/* BOX1-TOP */}

      {/* BOX2-CENTER */}
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

        <div>
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 z-0 ">
            {searchedPosts.length > 0 ? (
              searchedPosts.map((el, idx) => <CardPost key={idx} el={el} />)
            ) : (
              <p className="h-screen text-center text-gray-600 dark:text-gray-300 mt-4">
                No results found for "{getSearch}".
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
