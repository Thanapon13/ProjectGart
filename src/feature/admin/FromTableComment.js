import { MdDelete } from "react-icons/md";
import ModalConfirmSave from "../../components/modal/ModalConfirmSave";
import { useState } from "react";
import { adminDeleteCommentId } from "../../apis/post-api";

export default function FromTableComment({ data, setCommentData }) {
  //   console.log("data:", data);
  const [showModalDeleteComment, setShowModalDeleteComment] = useState(false);
  const [selectedDeleteComment, setSelectedDeleteComment] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  //   console.log("selectedDeleteComment:", selectedDeleteComment);
  //   console.log("selectedUserId:", selectedUserId);

  const handleClickDeleteComment = async () => {
    try {
      const input = { id: selectedDeleteComment, userId: selectedUserId };
      await adminDeleteCommentId(input);

      setCommentData(prevCommentData => {
        const updatedCommentData = prevCommentData.filter(
          comment => comment.id !== selectedDeleteComment
        );
        return updatedCommentData;
      });
      setSelectedDeleteComment(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Comment Id
            </th>

            <th scope="col" className="px-6 py-3">
              Post Id
            </th>
            <th scope="col" className="px-6 py-3">
              User Id
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((el, idx) => (
            <tr
              key={idx}
              className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="w-[50px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {el.id}
              </th>

              <td className="px-6 py-4">{el?.Post?.id}</td>
              <td className="px-6 py-4">{el?.User?.id}</td>
              <div className="w-[100px] line-clamp-2">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {" "}
                  {el?.title}
                </td>
              </div>

              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <button
                  onClick={() => {
                    setShowModalDeleteComment(!showModalDeleteComment);
                    setSelectedDeleteComment(el?.id);
                    setSelectedUserId(el?.User?.id);
                  }}
                  className={`text-3xl hover:text-red-600  `}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModalDeleteComment && (
        <ModalConfirmSave
          isVisible={showModalDeleteComment}
          onClose={() => setShowModalDeleteComment(false)}
          onSave={handleClickDeleteComment}
          header="Delete Comment"
          text='Do you want to "Delete Comment" ?'
        />
      )}
    </div>
  );
}
