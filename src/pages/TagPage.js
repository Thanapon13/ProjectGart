import useTag from "../hooks/useTag";
import { Link } from "react-router-dom";

export default function TagPage() {
  const { dataTag } = useTag();
  // console.log("dataTag:", dataTag);

  return (
    <div className="h-screen">
      <div className="w-full text-center p-4 border-b-2 border-slate-400">
        <h1 className="text-3xl font-bold">Tag</h1>
      </div>

      <div className="w-[90%] m-auto flex flex-wrap gap-10">
        {dataTag.map((el, idx) => (
          <div
            className="relative flex flex-col gap-2 items-center mt-10"
            key={idx}
          >
            <Link key={idx} to="/" state={{ id: el.TagName }}>
              <img
                className="rounded-t-lg w-[200px] h-[200px] cursor-pointer  object-cover"
                src={el.image}
                alt=""
              />
            </Link>

            <div>
              <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {el?.TagName}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
