import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function FromTagData({
  dataTag,
  setOpenTag,
  setTagIdDelete,
  setShowModalDeleteTag,
  showModalDeleteTag
}) {
  const { authenticateUser } = useAuth();

  return (
    <div className="mt-10 flex flex-wrap gap-10 b">
      {authenticateUser?.isAdmin === true ? (
        <div className="flex">
          <div className="">
            <div className="bg-gray-400 rounded-t-lg w-[200px] h-[200px] cursor-pointer ml-10 flex items-center justify-center">
              <button onClick={setOpenTag}>
                <i className="text-2xl">
                  <FaPlus />
                </i>
              </button>
            </div>
            <div className="text-center">
              <h1>New Tag</h1>
            </div>
          </div>
        </div>
      ) : null}

      {dataTag?.map((el, idx) => (
        <div
          className="relative flex flex-col flex-wrap gap-2 items-center"
          key={idx}
        >
          <div className="relative">
            {authenticateUser?.isAdmin === true ? (
              <button
                onClick={() => {
                  setTagIdDelete(el.id);
                  setShowModalDeleteTag(!showModalDeleteTag);
                }}
                className="absolute top-0 right-0 text-3xl cursor-pointer hover:text-red-600 "
              >
                <RiDeleteBin5Fill />
              </button>
            ) : null}
            <Link key={idx} to="/" state={{ id: el.TagName }}>
              <img
                className="rounded-t-lg w-[200px] h-[200px] cursor-pointer object-cover"
                src={el.image}
                alt=""
              />
            </Link>
          </div>

          <div>
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {el?.TagName}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}
