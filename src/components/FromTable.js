import { formatDate } from "../utils/formatDate ";
import profileImage from "../assets/blank.png";
import { MdHideImage } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaBan } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FromTable({
  titleImage,
  titleName,
  titleOwner,
  titlePostDate,
  titleEmail,
  titleLastLogin,
  data,
  setShowModal,
  showModal,
  onPostId,
  onUserId,
  onTagId,
  userId,
  isCheck,
  icon,
  isCheckHistory,
  setAdminHistoryRestoreId,
  setShowModalDeleteRestoredPosSuccess,
  showModalDeleteRestoredPosSuccess,
  status,
  handleClickLikeButton,
  setShowModalBanUser,
  showModalBanUser
}) {
  // console.log("data:", data);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const sorted = data.slice().sort((a, b) => {
        const dateA = new Date(a.createdAt || a.lastLoggedIn);
        const dateB = new Date(b.createdAt || b.lastLoggedIn);
        return dateB - dateA;
      });

      setSortedData(sorted);
    }
  }, [data]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = sortedData.slice(indexOfFirstPost, indexOfLastPost);
  // console.log("currentPosts:", currentPosts);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(data.length / postsPerPage);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              {titleImage}
            </th>
            <th scope="col" className="px-6 py-3">
              {titleName}
            </th>
            <th scope="col" className="px-6 py-3">
              {titleOwner} {titleEmail}
            </th>
            <th scope="col" className="px-6 py-3">
              {titlePostDate} {titleLastLogin}
            </th>
            {status ? (
              <th scope="col" className="px-6 py-3">
                {status}
              </th>
            ) : null}
            <th scope="col" className="px-6 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {currentPosts.length > 0 ? (
            currentPosts?.map((el, idx) => (
              <tr
                key={idx}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {isCheck ? (
                    <Link to="/profilePage" state={{ id: el?.id }}>
                      <img
                        className="w-[100px] h-[100px] rounded-lg cursor-pointer object-cover"
                        src={
                          el?.image
                            ? JSON.parse(el.image)[0]
                            : el?.profileImage || el?.imagePost || profileImage
                        }
                        alt=""
                      />
                    </Link>
                  ) : (
                    <Link to={`/postDetailPage/${el.id}`}>
                      <img
                        className="w-[100px] h-[100px] rounded-lg cursor-pointer object-cover"
                        src={
                          el?.image
                            ? JSON.parse(el.image)[0]
                            : el?.profileImage || el?.imagePost || profileImage
                        }
                        alt=""
                      />
                    </Link>
                  )}
                </th>
                <td className="px-6 py-4">
                  <div className="w-[200px]">
                    <p className="line-clamp-1">
                      {el?.title} {el?.firstName} {el?.lastName} {el?.titlePost}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {el?.User?.firstName} {el?.User?.lastName} {el?.email}
                </td>
                <td className="px-6 py-4">
                  {formatDate(el?.createdAt || el?.lastLoggedIn)}
                </td>
                {status ? <td className="px-6 py-4">{el?.status}</td> : null}

                <td className="px-6 py-4">
                  {isCheckHistory ? (
                    <div className="w-full flex flex-col">
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={() => {
                          setShowModal(!showModal);
                          setAdminHistoryRestoreId(el.id);
                        }}
                      >
                        Restore
                      </button>

                      <button
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => {
                          setShowModalDeleteRestoredPosSuccess(
                            !showModalDeleteRestoredPosSuccess
                          );
                          setAdminHistoryRestoreId(el.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ) : isCheck ? (
                    <div className="flex justify-center items-center gap-4">
                      {/* <button
                        onClick={() => {
                          setShowModal(!showModal);
                          userId(el.id);
                        }}
                        className="text-2xl hover:text-red-600"
                      >
                        {icon}
                      </button> */}

                      <button
                        onClick={() => {
                          setShowModalBanUser(!showModalBanUser);
                          userId(el.id);
                        }}
                        className={`text-2xl hover:text-red-600 ${
                          el.status === "BANUSER" ? "text-red-600" : null
                        } `}
                      >
                        <FaBan />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-4">
                      {/* <button
                        onClick={() => {
                          setShowModal(!showModal);
                          onPostId(el?.id);
                          onUserId(el?.User?.id);
                          onTagId(el?.Tag?.id);
                        }}
                        className="text-2xl hover:text-red-600"
                      >
                        {icon}
                      </button> */}

                      <button
                        onClick={() => handleClickLikeButton(el?.id)}
                        className={`text-2xl hover:text-red-600 ${
                          el.status === "HIDEPOST" ? "text-red-600" : null
                        }`}
                      >
                        <MdHideImage />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr className="w-full h-[100px] odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td colSpan="5">
                <div className="w-full flex items-center justify-center">
                  <h1 className="text-xl font-bold"> No Restored Post found</h1>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}

      <div className="mt-5 mb-5 w-full flex justify-center gap-2 h-12 pr-2 items-center text-text-black-table text-xs font-semibold  bg-white rounded-b-lg ">
        <nav>
          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <a
                href="#"
                className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
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
              { length: Math.ceil(data.length / postsPerPage) },
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
  );
}
