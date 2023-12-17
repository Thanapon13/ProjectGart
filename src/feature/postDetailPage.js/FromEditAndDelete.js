import { BiDotsHorizontal } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import boxIcon from "../../public/pics/boxIcon.png";
import Modal from "../../components/modal/Modal";

export default function FromEditAndDelete({
  setOpen,
  open,
  setOpenModalEditPost,
  openModalEditPost,
  setShowModalDeletePost,
  showModalDeletePost,
  handleChangeInput,
  input,
  dataTag,
  arrayImage,
  arrayImageURL,
  deleteImg,
  inputImg,
  handleImageChange,
  handleSubmitForm,
  handleCancel
}) {
  console.log("input:", input);
  return (
    <div className="relative inline-block text-left flex items-center">
      <button
        type="button"
        className="rounded-full inline-flex items-center justify-center p-2 text-gray-500 transition duration-300 ease-in-out transform hover:bg-gray-200 focus:outline-none focus:ring focus:border-blue-300"
        onClick={() => setOpen(!open)}
      >
        <BiDotsHorizontal className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute z-10 left-0 top-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="avatarButton"
            >
              <button
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  setOpenModalEditPost(!openModalEditPost);
                }}
              >
                <li className="flex items-center gap-3 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  <p>Edit Post</p>
                </li>
              </button>

              <li className="flex items-center gap-3 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ">
                <button
                  onClick={() => {
                    setOpen(false);
                    setShowModalDeletePost(!showModalDeletePost);
                  }}
                >
                  <p>Delete Post</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      {openModalEditPost && (
        <Modal
          header="Edit Post"
          isVisible={openModalEditPost}
          onClose={() => setOpenModalEditPost(false)}
        >
          <div className="w-[800px]">
            <div className="w-full flex flex-col  gap-4 items-center justify-center bg-white">
              <div className="w-full flex justify-center items-center p-2 mb-10">
                <div className="w-2/5">
                  <div className="mb-6">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={handleChangeInput}
                      value={input.title}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={handleChangeInput}
                      value={input.description}
                    />
                  </div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tag
                  </label>

                  <select
                    id="countries"
                    className="bg-gray-5  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="tagId"
                    onChange={handleChangeInput}
                    value={input.tagId}
                  >
                    <option value="">Please select</option>
                    {dataTag.map((el, idx) => (
                      <option key={idx} value={el.id}>
                        {el.TagName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-2/5 sm:grid sm:grid-cols-4">
                {arrayImage[0] ? (
                  <div className="w-[400px] flex items-center justify-center">
                    <div className="">
                      {arrayImage.map((image, idx) => (
                        <div
                          className="flex items-start justify-center gap-2"
                          key={idx}
                        >
                          <div className="">
                            <img
                              src={arrayImageURL[idx]}
                              crossOrigin="true"
                              className=" object-cover h-[200px]"
                            />
                          </div>

                          <div>
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
                ) : (
                  <div className=" border-2 sm:col-span-4 bg-background-page py-10 px-30 rounded-lg flex flex-col justify-center items-center gap-4 h-80">
                    <img src={boxIcon} className="w-[50px]" />
                    <div className="text-text-green font-semibold">
                      Drag files here or
                    </div>
                    <button
                      className="inline-flex justify-center items-center py-1 px-4 border-2 border-text-green shadow-sm font-medium rounded-full text-text-green hover:bg-sidebar-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
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
                    {arrayImage.length > 0 ? (
                      <div className="flex flex-col justify-center items-center">
                        <div className="text-text-gray text-sm">
                          Can upload no more than ({arrayImage.length}/1)
                        </div>
                        <div className="text-text-gray text-sm">
                          Limit files (JPEG, PNG)
                        </div>
                      </div>
                    ) : (
                      <div className="text-text-gray text-sm">
                        Can upload no more than (0/1)
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="w-full text-center mb-5">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={handleSubmitForm}
                >
                  Confirm
                </button>

                <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
