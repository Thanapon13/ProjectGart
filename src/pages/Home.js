// import { useLocation, useNavigate } from "react-router-dom";
// import usePost from "../hooks/usePost";
// import CardPost from "../components/CardPost";
// import { useEffect, useState } from "react";
// import useAuth from "../hooks/useAuth";
// import { BiSolidLike } from "react-icons/bi";
// import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
// import { FaUser, FaHashtag } from "react-icons/fa";

// import ButtonClear from "../components/ButtonClear";
// import useTag from "../hooks/useTag";

// export default function HomePage() {
//   const navigate = useNavigate();
//   const { postData } = usePost();
//   // console.log("postData:", postData);
//   const { dataTag } = useTag();
//   console.log("dataTag:", dataTag);
//   const { authenticateUser } = useAuth();
//   const [selectedTagId, setSelectedTagId] = useState(null);
//   const [sortByLikes, setSortByLikes] = useState(false);
//   const [viewMyPosts, setViewMyPosts] = useState(false);
//   const [getSearch, setGetSearch] = useState(null);
//   const [searchedPosts, setSearchedPosts] = useState([]);
//   // console.log("searchedPosts:", searchedPosts);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage] = useState(12);

//   const [openTag, setOpenTag] = useState(false);
//   const [selectedTagMenu, setSelectedTagMenu] = useState(null);
//   console.log("selectedTagMenu:", selectedTagMenu);

//   const toggleSortByLikes = () => {
//     setSortByLikes(!sortByLikes);
//     setViewMyPosts(false);
//     setSelectedTagId(null);
//     setSearchedPosts([]);
//   };

//   const location = useLocation();

//   useEffect(() => {
//     if (location.state) {
//       if (typeof location.state === "string") {
//         setGetSearch(location.state);
//         setSelectedTagId(location.state);
//       } else if (typeof location.state === "object" && location.state.id) {
//         setSelectedTagId(location.state.id);
//         setGetSearch(location.state.id);
//       } else {
//         setSelectedTagId(null);
//       }
//     }
//   }, [location.state]);

//   const clearSearch = () => {
//     setSelectedTagId(null);
//     setGetSearch(null);
//     setViewMyPosts(null);
//     setSearchedPosts([]);
//     setCurrentPage(1);
//     navigate("/");
//   };

//   const filterAndSortPosts = () => {
//     const filteredPosts = selectedTagId
//       ? postData.filter(
//           post =>
//             post.Tag.TagName.toLowerCase() === selectedTagId.toLowerCase() ||
//             post.title.toLowerCase().includes(getSearch.toLowerCase())
//         )
//       : viewMyPosts
//       ? postData.filter(post => post.User.id === authenticateUser.id)
//       : postData;

//     const searchedPosts = getSearch
//       ? filteredPosts.filter(post => {
//           const titleLower = post.title.toLowerCase();
//           const tagNameLower = post.Tag.TagName.toLowerCase();
//           const searchLower = getSearch.toLowerCase();
//           return (
//             titleLower.includes(searchLower) ||
//             tagNameLower.includes(searchLower)
//           );
//         })
//       : filteredPosts;

//     const sortedPosts = [...searchedPosts].sort((a, b) => {
//       if (sortByLikes) {
//         return b.Likes.length - a.Likes.length;
//       } else {
//         return b.id - a.id;
//       }
//     });

//     // คำนวณหน้าปัจจุบัน
//     const indexOfLastPost = currentPage * postsPerPage;
//     const indexOfFirstPost = indexOfLastPost - postsPerPage;

//     if (indexOfFirstPost >= sortedPosts.length) {
//       setCurrentPage(Math.ceil(sortedPosts.length / postsPerPage));
//       return;
//     }

//     const currentPosts = sortedPosts.slice(
//       indexOfFirstPost,
//       Math.min(indexOfLastPost, sortedPosts.length)
//     );

//     setSearchedPosts(currentPosts);
//   };

//   useEffect(() => {
//     filterAndSortPosts();
//   }, [
//     selectedTagId,
//     sortByLikes,
//     viewMyPosts,
//     getSearch,
//     postData,
//     currentPage
//   ]);

//   const paginate = pageNumber => setCurrentPage(pageNumber);

//   const totalPages = Math.ceil(postData.length / postsPerPage);

//   // console.log(
//   //   "totalPages:",
//   //   `${postData.length} /  ${postsPerPage} = ${postData.length / postsPerPage} `
//   // );

//   const handleMenuTagClick = menu => {
//     setSelectedTagMenu(menu);
//   };

//   const clearAll = () => {
//     setSelectedTagId(null);
//     setGetSearch(null);
//     setViewMyPosts(null);
//     setSortByLikes(false);
//     setSearchedPosts([]);
//     setCurrentPage(1);
//     navigate("/");
//   };
//   return (
//     <div className="relative">
//       <div className="w-full flex">
//         <div className="w-1/5 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
//           <ul className="space-y-2 font-medium">
//             {authenticateUser ? (
//               <li>
//                 <button
//                   href="#"
//                   className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group ${
//                     viewMyPosts ? "bg-gray-300" : null
//                   }`}
//                   onClick={() => setViewMyPosts(!viewMyPosts)}
//                 >
//                   <i>
//                     <FaUser />
//                   </i>
//                   <span className="ms-3">Post</span>
//                 </button>
//               </li>
//             ) : null}

//             <li>
//               <button
//                 href="#"
//                 className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group ${
//                   sortByLikes ? "bg-gray-300" : null
//                 }`}
//                 onClick={toggleSortByLikes}
//               >
//                 <i>
//                   <BiSolidLike />
//                 </i>
//                 <span className="ms-3">Likes</span>
//               </button>
//             </li>

//             <li>
//               <button
//                 onClick={() => {
//                   setOpenTag(() => !openTag);
//                 }}
//                 className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group `}
//               >
//                 <div className="w-full flex items-center justify-between">
//                   <p className="flex items-center gap-2">
//                     <span>
//                       <FaHashtag />
//                     </span>{" "}
//                     Tag
//                   </p>
//                   {!openTag ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}
//                 </div>
//               </button>

//               {openTag && (
//                 <>
//                   {dataTag?.map((el, idx) => (
//                     <div className="w-full p-2">
//                       <button
//                         key={idx}
//                         href="#"
//                         onClick={() => handleMenuTagClick(el.TagName)}
//                         className={`w-full cursor-pointer rounded-lg flex flex-col hover:bg-gray-200 p-2 ${
//                           selectedTagMenu === el.TagName ? "bg-gray-300" : null
//                         } `}
//                       >
//                         <p className={`text-[14px] $`}>{el.TagName}</p>
//                       </button>
//                     </div>
//                   ))}
//                 </>
//               )}
//             </li>
//           </ul>
//         </div>

//         <div className="w-full">
//           <div className="flex">
//             <div className="p-2">
//               {sortByLikes && (
//                 <ButtonClear onClick={toggleSortByLikes} title="Like" />
//               )}
//             </div>

//             <div className="p-2">
//               {getSearch && (
//                 <ButtonClear onClick={clearSearch} getSearch={getSearch} />
//               )}
//             </div>

//             <div className="p-2">
//               {viewMyPosts && (
//                 <ButtonClear onClick={clearSearch} getSearch="Posts" />
//               )}
//             </div>

//             {viewMyPosts || getSearch || sortByLikes ? (
//               <div className="p-2">
//                 <ButtonClear onClick={clearAll} title="Clear All" />
//               </div>
//             ) : null}
//           </div>

//           <div className="w-full flex flex-col justify-center items-center">
//             <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-4 z-0">
//               {searchedPosts?.length > 0 ? (
//                 searchedPosts?.map((el, idx) => <CardPost key={idx} el={el} />)
//               ) : (
//                 <p className="flex items-start justify-center h-screen text-center text-gray-600 dark:text-gray-300 mt-4">
//                   No results found for "{`${getSearch || "Post"}`}".
//                 </p>
//               )}
//             </div>
//             {/* Pagination */}
//             <div className="w-full flex justify-center gap-2 h-12 pr-2 items-center text-text-black-table text-xs font-semibold  bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
//               <nav>
//                 <ul className="inline-flex -space-x-px text-base h-10">
//                   <li>
//                     <a
//                       href="#"
//                       className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
//                         currentPage === 1
//                           ? "pointer-events-none opacity-50"
//                           : ""
//                       }`}
//                       onClick={() => {
//                         if (currentPage > 1) {
//                           paginate(currentPage - 1);
//                         }
//                       }}
//                     >
//                       Previous
//                     </a>
//                   </li>

//                   {Array.from({ length: totalPages }).map((_, index) => (
//                     <li key={index}>
//                       <a
//                         href="#"
//                         className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border ${
//                           currentPage === index + 1
//                             ? "bg-blue-200 text-blue-600"
//                             : "border-gray-300 "
//                         } hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
//                         onClick={() => paginate(index + 1)}
//                       >
//                         {index + 1}
//                       </a>
//                     </li>
//                   ))}

//                   <li>
//                     <a
//                       href="#"
//                       className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border rounded-e-lg border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
//                         currentPage === totalPages
//                           ? "pointer-events-none opacity-50"
//                           : ""
//                       }`}
//                       onClick={() => {
//                         if (currentPage < totalPages) {
//                           paginate(currentPage + 1);
//                         }
//                       }}
//                     >
//                       Next
//                     </a>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  const navigate = useNavigate();
  const { postData } = usePost();
  console.log("postData:", postData);
  const { dataTag } = useTag();
  // console.log("dataTag:", dataTag);
  const { authenticateUser } = useAuth();
  const [selectedTagId, setSelectedTagId] = useState(null);
  // console.log("selectedTagId", selectedTagId);
  const [sortByLikes, setSortByLikes] = useState(false);
  const [viewMyPosts, setViewMyPosts] = useState(false);
  // console.log("viewMyPosts:", viewMyPosts);
  const [getSearch, setGetSearch] = useState(null);
  console.log("getSearch:", getSearch);
  const [searchedPosts, setSearchedPosts] = useState([]);
  // console.log("searchedPosts:", searchedPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const [openTag, setOpenTag] = useState(false);
  const [sortByLikesForTag, setSortByLikesForTag] = useState(false);

  const toggleSortByLikes = () => {
    setSortByLikes(!sortByLikes);
    setViewMyPosts(false);
    setSortByLikesForTag(false);
    setSelectedTagId(null);
    setSearchedPosts([]);
    setCurrentPage(1);
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
    setCurrentPage(1);
    navigate("/");
  };

  const filterAndSortPosts = () => {
    const filteredPosts = selectedTagId
      ? postData.filter(
          post =>
            post.Tag &&
            post.Tag.TagName &&
            post.Tag.TagName.toLowerCase() === selectedTagId.toLowerCase()
        )
      : viewMyPosts
      ? postData.filter(post => post.User.id === authenticateUser.id)
      : postData;

    const searchedPosts = getSearch
      ? filteredPosts.filter(post => {
          const titleLower = post.title.toLowerCase();
          const tagNameLower = (post.Tag?.TagName || "").toLowerCase();
          const searchLower = getSearch.toLowerCase();
          return (
            titleLower.includes(searchLower) ||
            tagNameLower.includes(searchLower)
          );
        })
      : filteredPosts;

    const postsWithSelectedTag = selectedTagId
      ? searchedPosts.filter(
          post =>
            post.Tag &&
            post.Tag.TagName &&
            post.Tag.TagName.toLowerCase() === selectedTagId.toLowerCase()
        )
      : searchedPosts;

    // const sortedPosts = [...postsWithSelectedTag].sort((a, b) => {
    //   if (sortByLikes) {
    //     return b.Likes.length - a.Likes.length;
    //   } else {
    //     return b.id - a.id;
    //   }
    // });

    const sortedPosts = [...postsWithSelectedTag].sort((a, b) => {
      if (sortByLikes || sortByLikesForTag) {
        return b.Likes.length - a.Likes.length;
      } else {
        return b.id - a.id;
      }
    });

    // คำนวณหน้าปัจจุบัน
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    if (indexOfFirstPost >= sortedPosts.length) {
      setCurrentPage(Math.ceil(sortedPosts.length / postsPerPage));
      return;
    }

    const currentPosts = sortedPosts.slice(
      indexOfFirstPost,
      Math.min(indexOfLastPost, sortedPosts.length)
    );

    setSearchedPosts(currentPosts);

    const stateToPersist = {
      selectedTagId,
      sortByLikes,
      sortByLikesForTag,
      viewMyPosts,
      getSearch,
      currentPage
    };

    localStorage.setItem("homePageState", JSON.stringify(stateToPersist));
  };

  useEffect(() => {
    filterAndSortPosts();
    const persistedState = localStorage.getItem("homePageState");
    if (persistedState) {
      const parsedState = JSON.parse(persistedState);
      setSelectedTagId(parsedState.selectedTagId);
      setSortByLikes(parsedState.sortByLikes);
      setSortByLikesForTag(parsedState.sortByLikesForTag);
      setViewMyPosts(parsedState.viewMyPosts);
      setGetSearch(parsedState.getSearch);
      setCurrentPage(parsedState.currentPage);
    }
  }, [
    selectedTagId,
    sortByLikes,
    viewMyPosts,
    getSearch,
    postData,
    currentPage
  ]);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(postData.length / postsPerPage);

  // console.log(
  //   "totalPages:",
  //   `${postData.length} /  ${postsPerPage} = ${postData.length / postsPerPage} `
  // );

  const handleMenuTagClick = menu => {
    setSelectedTagId(prevId => (prevId === menu ? null : menu));
    setViewMyPosts(false);
    setSortByLikesForTag(prev =>
      prev && selectedTagId === menu ? !prev : false
    );

    // setSortByLikes(false);
    setSearchedPosts([]);
    setCurrentPage(1);
    filterAndSortPosts();
  };

  const clearAll = () => {
    setSelectedTagId(null);
    setGetSearch(null);
    setViewMyPosts(null);
    setSortByLikes(false);
    setSortByLikesForTag(false);
    setSearchedPosts([]);
    setCurrentPage(1);
    navigate("/");

    // Clear the persisted state from localStorage
    localStorage.removeItem("homePageState");
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

            <li>
              <button
                onClick={() => {
                  setOpenTag(() => !openTag);
                }}
                className={`w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group `}
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
                    <div className="w-full p-2">
                      <button
                        key={idx}
                        href="#"
                        onClick={() => handleMenuTagClick(el.TagName)}
                        className={`w-full cursor-pointer rounded-lg flex flex-col hover:bg-gray-200 p-2 ${
                          selectedTagId === el.TagName ? "bg-gray-300" : null
                        } `}
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
            <div className="p-2">
              {selectedTagId && (
                <ButtonClear onClick={clearSearch} getSearch={selectedTagId} />
              )}
            </div>

            {viewMyPosts || getSearch || sortByLikes ? (
              <div className="p-2">
                <ButtonClear onClick={clearAll} title="Clear All" />
              </div>
            ) : null}
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-4 z-0">
              {searchedPosts?.length > 0 ? (
                searchedPosts?.map((el, idx) => <CardPost key={idx} el={el} />)
              ) : (
                <p className="flex items-start justify-center h-screen text-center text-gray-600 dark:text-gray-300 mt-4">
                  No results found for "{`${getSearch || "Post"}`}".
                </p>
              )}
            </div>
            {/* Pagination */}
            <div className="w-full flex justify-center gap-2 h-12 pr-2 items-center text-text-black-table text-xs font-semibold  bg-white rounded-b-lg border-b-[1px] border-border-gray-table">
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

                  {Array.from({ length: totalPages }).map((_, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border ${
                          currentPage === index + 1
                            ? "bg-blue-200 text-blue-600"
                            : "border-gray-300 "
                        } hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </a>
                    </li>
                  ))}

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
