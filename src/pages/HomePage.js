import { useLocation, useNavigate } from "react-router-dom";
import usePost from "../hooks/usePost";
import CardPost from "../components/CardPost";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { BiSolidLike } from "react-icons/bi";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { FaUser, FaHashtag } from "react-icons/fa";
import ButtonClear from "../components/ButtonClear";
import useTag from "../hooks/useTag";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { postData } = usePost();
  // console.log("postData:", postData);
  const { dataTag } = useTag();
  // console.log("dataTag:", dataTag);
  const { authenticateUser } = useAuth();
  // console.log("authenticateUser:", authenticateUser.id);
  const [openTag, setOpenTag] = useState(false);
  const [getSearch, setGetSearch] = useState(null);
  // console.log("getSearch:", getSearch);
  const [selectedMenu, setSelectedMenu] = useState("");
  // console.log("selectedMenu:", selectedMenu);
  const [selectedTagNameMenu, setSelectedTagNameMenu] = useState("");
  // console.log("selectedTagNameMenu:", selectedTagNameMenu);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  const handleMenuClick = menu => {
    setSelectedMenu(
      (menu === "postMe" && selectedMenu === "postMe") ||
        (menu === "like" && selectedMenu === "like")
        ? null
        : menu
    );
  };

  useEffect(() => {
    if (location.state) {
      setGetSearch(location.state);
    }
  }, [location.state]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const sortedPosts = postData.slice().sort((a, b) => {
    if (selectedMenu === "like") {
      const likeComparison = b.Likes.length - a.Likes.length;

      // If likes are equal, sort by createdAt in descending order
      return likeComparison !== 0
        ? likeComparison
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const selectedPostMe = postData
    ?.filter(
      el => selectedMenu === "postMe" && el?.User?.id === authenticateUser?.id
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  // console.log("selectedPostMe:", selectedPostMe);

  const selectedTagName = postData?.filter(el => {
    if (selectedTagNameMenu === el?.Tag?.TagName) {
      return true;
    } else {
      return false;
    }
  });
  // console.log("selectedTagName:", selectedTagName);

  const currentPosts =
    selectedMenu === "postMe" && selectedTagNameMenu
      ? selectedPostMe.filter(post => post.Tag?.TagName === selectedTagNameMenu)
      : selectedMenu === "postMe"
      ? selectedPostMe
      : selectedTagNameMenu
      ? sortedPosts.filter(post => post.Tag?.TagName === selectedTagNameMenu)
      : getSearch
      ? sortedPosts.filter(post =>
          post.title.toLowerCase().includes(getSearch.toLowerCase())
        )
      : sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // console.log("currentPosts:", currentPosts);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(postData.length / postsPerPage);

  const clearSearch = () => {
    setGetSearch(null);
    setSelectedMenu(null);
    setSelectedTagNameMenu(null);
    navigate("/");
  };

  const clearLike = () => {
    setSelectedMenu(null);
    navigate("/");
  };

  const clearTag = () => {
    setSelectedTagNameMenu(null);
    navigate("/");
  };

  return (
    <div className="relative">
      <div className="w-full flex">
        <div className="w-[250px] px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col gap-4">
          <div className="border-b-2 p-2">
            <p className="font-bold text-2xl">Sort</p>
          </div>
          <ul className="space-y-2 font-medium">
            {authenticateUser ? (
              <li>
                <button
                  href="#"
                  className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group ${
                    selectedMenu === "postMe" ? "bg-gray-300" : null
                  }`}
                  onClick={() => handleMenuClick("postMe")}
                >
                  <i>
                    <FaUser />
                  </i>
                  <span className="ms-3">My Post</span>
                </button>
              </li>
            ) : null}

            <li>
              <button
                href="#"
                className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group ${
                  selectedMenu === "like" ? "bg-gray-300" : null
                }`}
                onClick={() => handleMenuClick("like")}
              >
                <i>
                  <BiSolidLike />
                </i>
                <span className="ms-3">Likes</span>
              </button>
            </li>

            <li>
              <button
                className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group ${
                  openTag ? "bg-gray-300" : null
                }`}
                onClick={() => {
                  setOpenTag(() => !openTag);
                }}
              >
                <div className="w-full flex items-center justify-between">
                  <p className="flex items-center gap-2">
                    <span>
                      <FaHashtag />
                    </span>{" "}
                    Tag
                  </p>
                  {!openTag ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}
                </div>
              </button>

              {openTag && (
                <>
                  {dataTag?.map((el, idx) => (
                    <div className="w-full p-2" key={idx}>
                      <button
                        href="#"
                        className={`w-full cursor-pointer rounded-lg flex flex-col hover:bg-gray-200 p-2 ${
                          selectedTagNameMenu === el.TagName
                            ? "bg-gray-300"
                            : null
                        } `}
                        onClick={() =>
                          setSelectedTagNameMenu(
                            selectedTagNameMenu === el.TagName
                              ? null
                              : el.TagName
                          )
                        }
                      >
                        <p className={`text-[14px] $`}>{el.TagName}</p>
                      </button>
                    </div>
                  ))}
                </>
              )}
            </li>
          </ul>
        </div>

        <div className="w-full">
          <div className="flex">
            <div className="p-2">
              {getSearch && (
                <ButtonClear onClick={clearSearch} getSearch={getSearch} />
              )}
            </div>

            <div className="mt-4">
              {selectedMenu === "like" && (
                <ButtonClear onClick={clearLike} title="Like" />
              )}
            </div>

            <div className="mt-4">
              {selectedMenu === "postMe" && (
                <ButtonClear
                  onClick={clearSearch}
                  title={`My Posts have : ${selectedPostMe.length} `}
                />
              )}
            </div>

            <div className="mt-4">
              {selectedTagNameMenu && (
                <ButtonClear
                  onClick={clearTag}
                  getSearch={`Tag ${selectedTagNameMenu} : ${selectedTagName.length} `}
                />
              )}
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-4 z-0">
              {currentPosts?.length > 0 ? (
                currentPosts.map((el, idx) => <CardPost key={idx} el={el} />)
              ) : (
                <p className="flex items-start justify-center h-screen text-center text-gray-600 dark:text-gray-300 mt-4">
                  No results found for "{`${"Post"}`}".
                </p>
              )}
            </div>

            {/* Pagination */}
            <div className="w-full flex justify-center gap-2 h-12 pr-2 items-center text-text-black-table text-xs font-semibold  bg-white rounded-b-lg mb-4">
              <nav>
                <ul className="inline-flex -space-x-px text-base h-10">
                  <li>
                    <a
                      href="#"
                      className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }`}
                      onClick={() => {
                        if (currentPage > 1) {
                          paginate(currentPage - 1);
                        }
                      }}
                    >
                      Previous
                    </a>
                  </li>

                  {Array.from(
                    { length: Math.ceil(postData.length / postsPerPage) },
                    (_, i) => {
                      return (
                        <li key={i}>
                          <a
                            href="#"
                            className={`flex items-center justify-center px-4 h-10 leading-tight  border 
            ${
              currentPage === i + 1
                ? "bg-blue-200 text-blue-600"
                : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
                            onClick={() => paginate(i + 1)}
                          >
                            {i + 1}
                          </a>
                        </li>
                      );
                    }
                  )}

                  <li>
                    <a
                      href="#"
                      className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border rounded-e-lg border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }`}
                      onClick={() => {
                        if (currentPage < totalPages) {
                          paginate(currentPage + 1);
                        }
                      }}
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
