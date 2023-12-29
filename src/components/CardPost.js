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
        <Link to={`/postDetailPage/${el?.id}`}>
          <div className="w-full">
            <img
              className={`${
                size ? `w-${size} h-${size}` : "w-full h-[250px]"
              } rounded-t-lg object-cover`}
              src={JSON.parse(el?.image)[0]}
              alt=""
            />
          </div>
          <div className="w-full flex-col justify-between items-center p-2 ">
            <div className="w-full flex flex-col ">
              <div className="flex items-center justify-between gap-10">
                <div className=" h-[30px] line-clamp-1">
                  <p className="font-bold  text-lg text-gray-800 dark:text-gray-400 hover:underline cursor-pointer">
                    {el?.title}
                  </p>
                </div>
              </div>

              <div className="h-[20px] line-clamp-1">
                <p className="font-normal text-sm text-gray-800 dark:text-gray-400 hover:underline cursor-pointer">
                  {el?.description}
                </p>
              </div>

              <div className="w-2/5 flex justify-start gap-6 mt-3">
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
                  <p className="text-sm ">{el?.Comments?.length}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
