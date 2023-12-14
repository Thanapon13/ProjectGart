import boxIcon from "../../public/pics/boxIcon.png";
import docIcon from "../../public/pics/docIcon.png";
import { AiOutlineDelete } from "react-icons/ai";

export default function FromCreateTag({
  error,
  inputImg,
  handleImageChange,
  arrayImage,
  arrayImageURL,
  deleteImg,
  input,
  handleChangeInput,
  handleCreateTag,
  setOpenTag
}) {
  return (
    <div className="w-[900px] flex justify-center items-center p-2">
      <div className="w-full h-full flex flex-col gap-4 items-center justify-center bg-white">
        <div className="w-2/5 sm:grid sm:grid-cols-4">
          <div
            className={` ${
              error.image
                ? "border border-red-600 "
                : " border border-gray-300 "
            }sm:col-span-4 bg-background-page py-10 px-30 rounded-lg flex flex-col justify-center items-center gap-4 h-80`}
          >
            <img src={boxIcon} className="w-[50px]" />
            <div className="text-text-green font-semibold">
              Drag files here or
            </div>
            <button
              className=" inline-flex  justify-center items-center py-1 px-4 border-2 border-text-green  shadow-sm font-medium rounded-full text-text-green  hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 "
              onClick={() => inputImg.current.click()}
            >
              Upload
            </button>
            <input
              type="file"
              multiple
              className="hidden"
              ref={inputImg}
              onChange={handleImageChange}
            />
            <div className="flex flex-col justify-center items-center">
              {arrayImage.length > 0 ? (
                <div className="text-text-gray text-sm">
                  Can upload no more than ({arrayImage.length}/1)
                </div>
              ) : (
                <div className="text-text-gray text-sm">
                  Can upload no more than (0/1)
                </div>
              )}
              <div className="text-text-gray text-sm">
                Limit files (JPEG , PNG)
              </div>
            </div>
          </div>

          {error && (
            <div className="w-[120px] text-red-600 text-sm">{error.image}</div>
          )}

          {/* file upload image*/}
          <div className="col-span-2 sm:mt-2">
            <div className="overflow-y-auto scrollbar">
              {arrayImage.map((el, idx) => (
                <div
                  key={idx}
                  className="w-full flex items-center border-2 rounded-lg mt-2 p-2"
                >
                  <div className="flex items-center justify-center">
                    {arrayImageURL.map((el, idx) => (
                      <div>
                        <img
                          src={el}
                          crossOrigin="true"
                          key={idx}
                          className="w-[40px]"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center text-text-green gap-4">
                    <div className="flex items-center ml-2 text-sm gap-2">
                      <img src={docIcon} className="w-4 h-4 " />
                      {el.image.name || el.image}
                    </div>

                    <button
                      onClick={() => deleteImg(idx)}
                      className="hover:text-red-600"
                    >
                      <AiOutlineDelete className="text-2xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center p-2 mb-10">
          <div className="w-2/5">
            <div className="mb-6">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                TagName
              </label>
              <input
                type="text"
                name="TagName"
                value={input.TagName}
                className={`w-full ${
                  error.TagName
                    ? "border border-red-600 "
                    : " border border-gray-300 "
                } bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                onChange={handleChangeInput}
              />

              {error && (
                <div className="text-red-600 text-sm">{error.TagName}</div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full text-center mb-5">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleCreateTag}
          >
            Confirm
          </button>

          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={setOpenTag}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
