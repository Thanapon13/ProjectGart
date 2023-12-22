import { formatDate } from "../utils/formatDate ";
import profileImage from "../assets/blank.png";
import { TbRestore } from "react-icons/tb";

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
  showModalDeleteRestoredPosSuccess
}) {
  // console.log("data:", data);
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
            <th scope="col" className="px-6 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data?.map((el, idx) => (
              <tr
                key={idx}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-[100px] h-[100px] rounded-lg cursor-pointer object-cover"
                    src={
                      el?.image
                        ? JSON.parse(el.image)[0]
                        : el?.profileImage || el?.imagePost || profileImage
                    }
                    alt=""
                  />
                </th>
                <td className="px-6 py-4">
                  <p className="line-clamp-3">
                    {el?.title} {el?.firstName} {el?.lastName} {el?.titlePost}
                  </p>
                </td>
                <td className="px-6 py-4">
                  {el?.User?.firstName} {el?.User?.lastName} {el?.email}
                </td>
                <td className="px-6 py-4">
                  {formatDate(el?.createdAt || el?.lastLoggedIn)}
                </td>

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
                    <button
                      onClick={() => {
                        setShowModal(!showModal);
                        userId(el.id);
                      }}
                      className="text-xl hover:text-red-600"
                    >
                      {icon}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShowModal(!showModal);
                        onPostId(el?.id);
                        onUserId(el?.User?.id);
                        onTagId(el?.Tag?.id);
                      }}
                      className="text-xl hover:text-red-600"
                    >
                      {icon}
                    </button>
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
    </div>
  );
}
