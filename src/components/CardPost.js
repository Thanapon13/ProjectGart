import { BiSolidLike } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CardPost({ el, size }) {
  if (el.status === "HIDEPOST") {
    return null;
  }
  return (
    <>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
        <div className="w-full">
          <Link to={`/postDetailPage/${el?.id}`}>
            <img
              className={` ${
                size ? size : "w-full h-[250px]"
              } rounded-t-lg object-cover`}
              src={JSON.parse(el?.image)[0]}
              alt=""
            />
          </Link>
        </div>
        <div className="w-full flex-col justify-between items-center p-2 ">
          <div className="w-full flex flex-col gap-2">
            <div className="h-[20px] line-clamp-2 ">
              <p className="font-normal text-gray-800 dark:text-gray-400">
                {el?.title}
              </p>
            </div>

            <div className="h-[20px] line-clamp-3">
              <p className="font-normal text-gray-800 dark:text-gray-400">
                {el?.description}
              </p>
            </div>
          </div>

          <div className="w-full flex justify-start gap-6 mt-3">
            <div className="flex items-center gap-2">
              {" "}
              <button className="text-sm text-gray-600">
                <BiSolidLike />
              </button>
              <p className="text-sm">{el?.Likes?.length}</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="text-sm text-gray-600">
                <FaCommentAlt />
              </button>
              <p className="text-sm hover:underline">{el?.Comments?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
