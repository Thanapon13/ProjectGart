import { BiSolidLike } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CardPost({ el, size, key }) {
  // console.log("el:", el);
  // console.log("size:", size);
  return (
    <>
      <div
        key={key}
        className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div>
          <Link to={`/postDetailPage/${el?.id}`}>
            <img
              className={` ${size ? size : "w-[436px] h-[306px]"} rounded-t-lg`}
              src={JSON.parse(el?.image)[0]}
              alt=""
            />
          </Link>
        </div>
        <div className="flex justify-between items-center p-2">
          <div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {el?.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {el?.description}
            </p>
          </div>

          <div className="flex justify-between gap-2">
            <div className="flex items-center items-center gap-2">
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
