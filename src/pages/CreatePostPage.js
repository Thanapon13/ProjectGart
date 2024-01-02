import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import boxIcon from "../public/pics/boxIcon.png";
import docIcon from "../public/pics/docIcon.png";
import { toast } from "react-toastify";
import { CreatePost } from "../apis/post-api";
import useLoading from "../hooks/useLoading";
import useAuth from "../hooks/useAuth";
import ModalSuccess from "../components/modal/ModalSuccess";
import useTag from "../hooks/useTag";
import validateCreatePost from "../validators/validate-createPost";

export default function CreatePostPage() {
  const inputImg = useRef();

  const { authenticateUser } = useAuth();

  const { dataTag } = useTag();
  // console.log("dataTag:", dataTag);

  const { startLoading, stopLoading } = useLoading();

  const imageTypes = ["image/png", "image/jpeg"];

  const [arrayImage, setArrayImage] = useState([]);
  // console.log("arrayImage:", arrayImage);

  const [arrayImageURL, setArrayImageURL] = useState([]);

  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    tagId: "",
    image: ""
  });
  // console.log("inputData:", input);

  const [error, setError] = useState({});
  // console.log("error:", error);

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setInput(prevInput => ({
      ...prevInput,
      [name]: value
    }));
  };

  const handleImageChange = e => {
    const fileList = e.target.files;
    // console.log("fileList:", fileList);

    const cloneFile = [...arrayImage];
    // console.log("cloneFile:", cloneFile);

    for (let i = 0; i < fileList.length; i++) {
      if (!imageTypes.includes(fileList[i].type)) {
        toast.warn(`${fileList[i].name} is wrong file type!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      } else if (fileList[i].size > 20000000) {
        toast.warn(`${fileList[i].name} has more than 20mb!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      } else if (cloneFile.length >= 1) {
        toast.warn(`Your images are more than 1!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      } else {
        cloneFile.push({ image: fileList[i] });
        // cloneFile.push(fileList[i]);
      }
    }
    setArrayImage(cloneFile);

    setInput(prevInput => ({
      ...prevInput,
      image: cloneFile
    }));
  };

  const deleteImg = idx => {
    let clone = [...arrayImage];
    clone.splice(idx, 1);
    setArrayImage(clone);
  };

  useEffect(() => {
    if (arrayImage.length < 1) return;
    const newImageUrls = [];
    // console.log(arrayImage);
    arrayImage.forEach(img => {
      console.log("img:", img);
      if (img._id) {
        newImageUrls.push(`http://localhost:4000/images/${img.image}`);
      } else {
        newImageUrls.push(URL.createObjectURL(img.image));
      }
    });
    // console.log("newImageUrls:", newImageUrls);
    setArrayImageURL(newImageUrls);
  }, [arrayImage]);

  const handleSubmitForm = async () => {
    try {
      const result = validateCreatePost(input);
      // console.log("result:", result);

      if (result) {
        setError(result);
      } else {
        setError({});
        startLoading();
        let formData = new FormData();
        formData.append("title", input.title);
        formData.append("description", input.description);
        formData.append("tagId", input.tagId);
        formData.append("userId", authenticateUser.id);

        for (let i = 0; i < arrayImage.length; i++) {
          console.log("arrayImage:", arrayImage);
          formData.append("image", arrayImage[i].image);
        }
        // console.log("arrayImage:", arrayImage[0].image);
        // console.log("title:", formData.getAll("title"));
        // console.log("image:", formData.getAll("image"));
        // console.log("description:", formData.get("description"));
        // console.log("tagId:", formData.get("tagId"));
        // console.log("userId:", formData.get("userId"));
        await CreatePost(formData);
        setInput({
          title: "",
          description: "",
          tagId: ""
        });
        setArrayImage([]);
        stopLoading();
        setShowModalSuccess(true);
      }
    } catch (err) {
      // console.log("Create Error", err);
      toast.error(err.response?.data.message);
    }
  };

  const handleCancel = () => {
    setInput({
      title: "",
      description: "",
      tagId: ""
    });
    setArrayImage([]);
  };

  return (
    <div
      className="w-full flex justify-center items-center p-2"
      style={{
        backgroundImage:
          "url('https://media.discordapp.net/attachments/1085571217563602965/1184558186146054154/abstract-background-6m6cjbifu3zpfv84.jpg?ex=658c68c7&is=6579f3c7&hm=9ed778c20f4b34161ae4b9a703e8853efca5fced522cab42a6e57c5ad44fabaa&=&format=webp&width=1191&height=670')",
        backgroundSize: "cover"
      }}
    >
      <div className="w-4/5 flex flex-col  gap-4 items-center justify-center bg-white">
        <div className="w-full p-2">
          <h1 className="text-2xl font-bold">Create Post</h1>
        </div>
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
                className={`w-full bg-gray-50 ${
                  error.title
                    ? "border border-red-600"
                    : "border border-gray-300 "
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                onChange={handleChangeInput}
                value={input.title}
                placeholder="Enter no more than 255 characters"
              />
              {error.title && (
                <div className="text-red-600 text-sm">{error.title}</div>
              )}
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
                className={`w-full bg-gray-50 ${
                  error.description
                    ? "border border-red-600"
                    : "border border-gray-300 "
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                onChange={handleChangeInput}
                value={input.description}
                placeholder="Enter no more than 255 characters"
              />
              {error && (
                <div className="text-red-600 text-sm">{error.description}</div>
              )}
            </div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tag
            </label>

            <select
              id="countries"
              className={`bg-gray-5 ${
                error.tagId
                  ? "border border-red-600"
                  : "border border-gray-300 "
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
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
            {error && <div className="text-red-600 text-sm">{error.tagId}</div>}
          </div>
        </div>

        <div className="w-2/5 sm:grid sm:grid-cols-4">
          {arrayImage[0] ? (
            <div className="w-[500px] col-span-2 sm:mt-2">
              <div className="">
                {arrayImage.map((image, idx) => (
                  <>
                    <div
                      className="flex items-start justify-center gap-2"
                      key={idx}
                    >
                      <div className="flex justify-start items-start">
                        <img
                          src={arrayImageURL[idx]}
                          crossOrigin="true"
                          className=" object-cover"
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
                  </>
                ))}
              </div>
            </div>
          ) : (
            <div
              className={` ${
                error.image ? "border border-red-600" : "border-2"
              } sm:col-span-4 bg-background-page py-10 px-30 rounded-lg flex flex-col justify-center items-center gap-4 h-80 `}
            >
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
                <div className="text-text-gray text-sm flex flex-col items-center justify-center">
                  <p>Can upload no more than (0/1)</p>
                  <p>Upload size no more than 20 mb (JPEG , PNG)</p>
                </div>
              )}
            </div>
          )}

          {error && <div className="text-red-600 text-sm">{error.image}</div>}
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

        {showModalSuccess && <ModalSuccess urlPath="/" />}
      </div>
    </div>
  );
}
