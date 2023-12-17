import { Link, useNavigate, useParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import usePost from "../hooks/usePost";
import useAuth from "../hooks/useAuth";
import { useRef, useState } from "react";
import {
  unlike,
  createLike,
  createComment,
  editComment,
  deleteCommentId,
  editPost,
  deletePost
} from "../apis/post-api";
import { requestFollow, deleteFollow } from "../apis/follow-api";
import { getCreatePostById } from "../apis/post-api";
import { useEffect } from "react";
import { BiSolidLike } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaCommentAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import ModalConfirmSave from "../components/modal/ModalConfirmSave";
import PostAction from "../feature/postDetailPage.js/PostAction";
import CardPost from "../components/CardPost";
import useTag from "../hooks/useTag";
import useLoading from "../hooks/useLoading";
import { toast } from "react-toastify";
import ModalSuccess from "../components/modal/ModalSuccess";
import FromEditAndDelete from "../feature/postDetailPage.js/FromEditAndDelete";

export default function PostDetailPage() {
  const { postId } = useParams();
  // console.log("postId:", postId);

  const inputImg = useRef();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  // console.log("title:", title);

  const [openModalEditPost, setOpenModalEditPost] = useState(false);
  const [open, setOpen] = useState(false);

  const { startLoading, stopLoading } = useLoading();

  const { dataTag } = useTag();
  // console.log("dataTag:", dataTag);

  const [editedComment, setEditedComment] = useState("");
  // console.log("editedComment:", editedComment);

  const imageTypes = ["image/png", "image/jpeg"];

  const [arrayImage, setArrayImage] = useState([]);
  // console.log("arrayImage:", arrayImage);

  const [arrayImageURL, setArrayImageURL] = useState([]);
  // console.log("arrayImageURL;", arrayImageURL);

  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalDeleteSuccess, setShowModalDeleteSuccess] = useState(false);

  const [postDataId, setPostDataId] = useState([]);
  console.log("postDataId:", postDataId);

  const [input, setInput] = useState({
    title: "",
    description: "",
    tagId: "",
    image: "",
    id: ""
  });
  // console.log("input:", input);

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setInput(prevInput => ({
      ...prevInput,
      [name]: value
    }));
  };

  const handleImageChange = e => {
    const fileList = e.target.files;
    const cloneFile = [...arrayImage];
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
      }
    }

    if (!fileList.length) return;

    const newImages = Array.from(fileList);

    setArrayImage(newImages);

    setInput(prevInput => ({
      ...prevInput,
      image: newImages
    }));
  };

  const deleteImg = idx => {
    let clone = [...arrayImage];
    clone.splice(idx, 1);
    setArrayImage(clone);
  };

  const handleSubmitForm = async () => {
    try {
      startLoading();
      let formData = new FormData();
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("tagId", input.tagId);
      formData.append("postId", postId);

      for (let i = 0; i < arrayImage.length; i++) {
        const file = arrayImage[i];

        if (typeof file === "string") {
          const response = await fetch(file);
          const blob = await response.blob();
          const imageFile = new File([blob], `image_${i}.png`);
          formData.append("image", imageFile);
        } else {
          formData.append("image", file);
        }
      }

      await editPost(formData);
      setInput({
        title: "",
        description: "",
        tagId: ""
      });
      setArrayImage([]);
      stopLoading();
      await setShowModalSuccess(true);
    } catch (err) {
      // console.log("Create Error", err);
      toast.error(err.response?.data.message);
    }
  };

  const handleClickDeletePost = async () => {
    try {
      startLoading();
      await deletePost({
        id: postId,
        userId: userId,
        tagId: tagId
      });
      stopLoading();

      await setPostData(prevPostData =>
        prevPostData.filter(post => post.id !== postId)
      );

      await setShowModalDeleteSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setInput({
      title: "",
      description: "",
      tagId: "",
      image: "",
      id: ""
    });
    setArrayImage([]);
  };

  useEffect(() => {
    if (arrayImage.length < 1) return;

    const newImageUrls = arrayImage.map(img => {
      if (typeof img === "string") {
        // If it's a URL string, no need to create an object URL
        return img;
      } else if (img instanceof File) {
        // If it's a File object, create an object URL
        return URL.createObjectURL(img);
      }
      return null;
    });

    setArrayImageURL(newImageUrls);

    // Cleanup previous object URLs to prevent memory leaks
    return () => {
      newImageUrls.forEach(url => {
        if (typeof url !== "string") {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [arrayImage]);

  const { postData, setPostData } = usePost();
  // console.log("postData:", postData);

  const { authenticateUser, getUserData, refreshUserData, userDatas } =
    useAuth();
  console.log("authenticateUser:", authenticateUser);
  // console.log("getUserData:", getUserData);
  // console.log("userDatas:", userDatas);

  const isCheckEdit = postDataId[0]?.id === authenticateUser?.id;
  console.log("isCheckEdit:", isCheckEdit);

  const [selectedComment, setSelectedComment] = useState(null);
  // console.log("selectedComment:", selectedComment);

  const [selectedDeleteComment, setSelectedDeleteComment] = useState(null);
  // console.log("selectedDeleteComment:", selectedDeleteComment);

  const [isFollowing, setIsFollowing] = useState(false);

  const [showModalDeleteComment, setShowModalDeleteComment] = useState(false);
  const [showModalDeletePost, setShowModalDeletePost] = useState(false);

  const [selectedPostData, setSelectedPostData] = useState(null);

  // console.log("selectedPostData:", selectedPostData);

  const getUserIdByPostId = postId => {
    const user = userDatas.find(user =>
      user.Posts.some(post => post.id === +postId)
    );
    return user ? user.id : null;
  };

  const userDataId = getUserIdByPostId(postId);
  // console.log("userDataId:", userDataId);

  useEffect(() => {
    const selectedPost = postData?.find(el => el?.id === +postId);
    setSelectedPostData(selectedPost);
  }, [postId, postData]);

  const userId = selectedPostData?.User?.id;
  // console.log("userId:", userId);

  const tagId = selectedPostData?.Tag?.id;
  // console.log("tagId:", tagId);

  useEffect(() => {
    const fetchPostId = async () => {
      const res = await getCreatePostById(userId);
      // console.log("res?.data?.pureCreatePost:", res?.data?.pureCreatePost);
      setPostDataId(res?.data?.pureCreatePost);

      const selectedUser = res?.data?.pureCreatePost.find(
        user => user.id === userId
      );
      // console.log("selectedUser:", selectedUser);

      const selectedPost = selectedUser?.Posts?.find(post => post.id == postId);

      // console.log("selectedPost:", selectedPost);

      setInput({
        ...input,
        title: selectedPost?.title,
        description: selectedPost?.description,
        tagId: selectedPost?.Tag?.id
      });

      const parsedImages = Array.isArray(selectedPost?.image)
        ? selectedPost?.image
        : JSON.parse(selectedPost?.image || "[]");

      setArrayImage(parsedImages);
    };
    fetchPostId();
  }, [userId]);

  useEffect(() => {
    const fetchUserInfoById = async () => {
      try {
        if (authenticateUser && authenticateUser.id) {
          const isFollowing =
            (getUserData.userFollows?.length > 0 &&
              getUserData.userFollows.some(
                follow =>
                  follow.accepterId === userId &&
                  follow.status === "ALREADYFOLLOW"
              )) ||
            (getUserData?.Follows &&
              getUserData.Follows.accepterId === userId &&
              getUserData.Follows.status === "ALREADYFOLLOW");

          setIsFollowing(isFollowing);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserInfoById();
  }, [authenticateUser, userId]);

  const handleClickFollow = async () => {
    try {
      if (!authenticateUser) {
        navigate("/loginPage");
      }
      await requestFollow(userId);
      setIsFollowing(true);
      await refreshUserData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickReject = async () => {
    try {
      await deleteFollow(userId);

      setIsFollowing(false);
      await refreshUserData();
    } catch (err) {
      console.log(err);
    }
  };

  const isUserLiked = selectedPostData?.Likes?.some(
    like => like?.User?.id === authenticateUser?.id
  );
  // console.log("isUserLiked:", isUserLiked);

  const handleClickLikeButton = async () => {
    if (isUserLiked) {
      await unlike(postId);
      setPostData(previousPosts => {
        const deepClone = structuredClone(previousPosts);
        // console.log("deepCloneUnlike:", deepClone);
        const idx = deepClone.findIndex(el => el.id === +postId);
        // console.log("idxUnlike:", idx);
        deepClone[idx].Likes = deepClone[idx].Likes.filter(
          el => el.userId !== authenticateUser.id
        );
        return deepClone;
      });
    } else {
      if (!authenticateUser) {
        navigate("/loginPage");
      } else {
        const res = await createLike(postId);
        console.log("res:", res.data.like);
        setPostData(previousPosts => {
          const deepClone = structuredClone(previousPosts);
          // console.log("deepCloneCreateLike:", deepClone);
          const idx = deepClone.findIndex(el => el.id === +postId);
          // console.log("idxCreateLike:", idx);
          deepClone[idx].Likes.push(res.data.like);
          return deepClone;
        });
      }
    }
  };

  const handleCreateComment = async () => {
    try {
      const res = await createComment({
        title: title,
        postId: postId,
        userId: userId
      });
      console.log("res:", res);
      setTitle("");
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTextareaKeyDown = e => {
    if (e.key === "Enter") {
      handleCreateComment();
    }
  };

  const handleEditComment = async () => {
    try {
      await editComment({
        title: editedComment,
        postId: postId,
        userId: userId,
        id: selectedComment
      });

      const updatedComments = selectedPostData.Comments.map(comment => {
        if (comment.id === selectedComment) {
          // ใช้ข้อมูลที่แก้ไขแทนที่ข้อมูลเดิม
          return { ...comment, title: editedComment };
        }
        return comment;
      });

      setSelectedPostData(prevData => ({
        ...prevData,
        Comments: updatedComments
      }));

      setEditedComment("");
      setSelectedComment(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickDeleteComment = async () => {
    try {
      await deleteCommentId({
        id: selectedDeleteComment,
        userId: userId
      });

      // Filter out the deleted comment from postData
      setPostData(previousPosts => {
        const deepClone = structuredClone(previousPosts);
        const postIndex = deepClone.findIndex(post => post.id === +postId);
        const updatedComments = deepClone[postIndex].Comments.filter(
          comment => comment.id !== selectedDeleteComment
        );
        deepClone[postIndex].Comments = updatedComments;
        return deepClone;
      });

      // Optionally, you can reset the selectedDeleteComment state
      setSelectedDeleteComment(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="">
      <div className="flex mb-20">
        {/* BOX-1-left */}

        <div className="w-full flex flex-col justify-start items-center  mt-6">
          {/* row-1-TOP */}
          <div className="w-4/5 flex flex-col gap-5">
            <div>
              <img
                className="w-full h-[400px] rounded-lg cursor-pointer object-cover"
                src={
                  selectedPostData?.image
                    ? JSON.parse(selectedPostData.image)[0]
                    : ""
                }
                alt=""
              />
            </div>
            {authenticateUser ? (
              <div
                className={`flex itesm-center ${
                  isCheckEdit ? "justify-between" : "justify-end"
                } `}
              >
                {isCheckEdit && (
                  <FromEditAndDelete
                    setOpen={setOpen}
                    open={open}
                    setOpenModalEditPost={setOpenModalEditPost}
                    openModalEditPost={openModalEditPost}
                    setShowModalDeletePost={setShowModalDeletePost}
                    showModalDeletePost={showModalDeletePost}
                    handleChangeInput={handleChangeInput}
                    input={input}
                    dataTag={dataTag}
                    arrayImage={arrayImage}
                    arrayImageURL={arrayImageURL}
                    deleteImg={deleteImg}
                    inputImg={inputImg}
                    handleImageChange={handleImageChange}
                    handleSubmitForm={handleSubmitForm}
                    handleCancel={handleCancel}
                  />
                )}

                <PostAction
                  isUserLiked={isUserLiked}
                  handleClickLikeButton={handleClickLikeButton}
                  selectedPostData={selectedPostData}
                />
              </div>
            ) : (
              <PostAction
                isUserLiked={isUserLiked}
                handleClickLikeButton={handleClickLikeButton}
                selectedPostData={selectedPostData}
              />
            )}
          </div>

          {/* row-2-BOTTOM */}
          <div className="w-4/5 flex flex-col gap-6">
            {/* BOX-TOP */}
            <div className="w-4/5">
              {authenticateUser && authenticateUser?.id === userId ? null : (
                <div className="flex justify-start items-center p-3">
                  <div className="w-1/4 flex flex-col justify-start items-start ml-2">
                    <div>
                      <h1>Owner</h1>
                    </div>
                    {authenticateUser ? (
                      <Link
                        to="/profilePage"
                        state={{ id: selectedPostData?.User.id }}
                      >
                        <div>
                          <Avatar
                            src={selectedPostData?.User.profileImage}
                            size="60px"
                          />
                        </div>
                      </Link>
                    ) : (
                      <Link to="/loginPage">
                        <div>
                          <Avatar
                            src={selectedPostData?.User.profileImage}
                            size="60px"
                          />
                        </div>
                      </Link>
                    )}
                  </div>

                  <div className="flex flex-col justify-center  gap-2">
                    <div className="flex gap-2">
                      <h1>By :</h1>
                      <h1 className="font-bold">
                        {selectedPostData?.User.firstName}{" "}
                        {selectedPostData?.User.lastName}
                      </h1>
                    </div>
                    {authenticateUser ? (
                      isFollowing ? (
                        <button
                          type="button"
                          className="w-[250px] text-white bg-green-700 hover:bg-blue-800 font-medium rounded-full text-sm p-2 text-center me-2 mb-2 "
                          onClick={handleClickReject}
                        >
                          ติดตามแล้ว
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="w-[250px] text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm p-2 text-center me-2 mb-2 "
                          onClick={handleClickFollow}
                        >
                          ติดตาม
                        </button>
                      )
                    ) : (
                      <button
                        type="button"
                        className="w-[250px] text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm p-2 text-center me-2 mb-2 "
                        onClick={handleClickFollow}
                      >
                        ติดตาม
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-4 p-3 flex flex-col gap-4">
                <div>
                  <div>
                    <h1 className="text-lg font-bold">
                      {selectedPostData?.title}
                    </h1>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <BiSolidLike /> :<p>{selectedPostData?.Likes?.length}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCommentAlt /> :
                      <p>{selectedPostData?.Comments?.length}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h1 className="font-bold text-sm">Description</h1>
                  <p>{selectedPostData?.description}</p>
                </div>
              </div>

              <div className="mt-4 p-3">
                {dataTag.map((el, idx) => (
                  <p className="text-base font-bold" key={idx}>
                    {selectedPostData?.Tag.TagName === el.TagName && (
                      <Link key={idx} to="/" state={{ id: el.TagName }}>
                        <span>#</span>
                        <span className="cursor-pointer hover:underline">
                          {el?.TagName.charAt(0).toUpperCase()}
                          {el?.TagName.slice(1)}
                        </span>
                      </Link>
                    )}
                  </p>
                ))}
              </div>
            </div>

            {/* BOX-BOTTOM */}
            <div className="w-4/5 flex flex-col items-center justify-start gap-4">
              {/* check login */}
              {authenticateUser ? (
                <div className="w-full flex items-center gap-4">
                  <div>
                    <Avatar src={authenticateUser.profileImage} size="60px" />
                  </div>

                  <div className="w-full flex flex-col">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Comment
                    </label>
                    <input
                      type="text"
                      name="title"
                      rows="4"
                      className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write your thoughts here..."
                      onChange={e => setTitle(e.target.value)}
                      onKeyDown={handleTextareaKeyDown}
                    ></input>
                  </div>
                </div>
              ) : null}

              {/* comment User */}
              {selectedPostData?.Comments.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
              ).map((el, idx) => {
                const isCurrentUserComment =
                  el?.User?.id === authenticateUser?.id;

                return (
                  <div
                    key={idx}
                    className={`w-full flex items-center gap-4 ${
                      isCurrentUserComment ? "border-2 rounded-lg p-2" : ""
                    }`}
                  >
                    <div>
                      <Avatar size="60px" src={el?.User?.profileImage} />
                    </div>

                    <div className="w-full flex flex-col">
                      <div className="w-full flex justify-start items-center gap-4">
                        <h1 className="font-bold">{`${el?.User?.firstName} ${el?.User?.lastName}`}</h1>
                        <h1>
                          {new Date(el?.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </h1>
                      </div>

                      <div className="w-full">
                        {selectedComment === el?.id ? (
                          // แสดงแบบแก้ไข comment
                          <div className="w-full flex flex-col items-center justify-center gap-2">
                            <textarea
                              className="w-full"
                              value={editedComment || el?.title}
                              onChange={e => setEditedComment(e.target.value)}
                            />

                            <div>
                              <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                onClick={handleEditComment}
                              >
                                ยืนยัน
                              </button>

                              <button
                                type="button"
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                onClick={() => setSelectedComment(false)}
                              >
                                ยกเลิก
                              </button>
                            </div>
                          </div>
                        ) : (
                          // แสดง comment ปกติ
                          <div className="whitespace-pre-line break-all">
                            <h1>{el?.title}</h1>
                          </div>
                        )}
                      </div>
                    </div>

                    {isCurrentUserComment && (
                      <div className="flex">
                        <button
                          className="p-2 text-lg hover:text-red-600"
                          onClick={() => {
                            if (selectedComment === el?.id) {
                              setSelectedComment(null);
                            } else {
                              setSelectedComment(el?.id);
                            }
                          }}
                        >
                          <CiEdit />
                        </button>

                        <button
                          className="p-2 text-lg hover:text-red-600"
                          onClick={() => {
                            setSelectedDeleteComment(el?.id);
                            setShowModalDeleteComment(!showModalDeleteComment);
                          }}
                        >
                          <RiDeleteBin5Fill />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOX-2-right */}
        <div className="w-2/4 flex flex-col gap-6 items-center p-2">
          <div>
            <h1 className="text-2xl font-bold">Recommend Picture</h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {postData
              .sort((a, b) => b.Likes.length - a.Likes.length)
              .slice(0, 5)
              .map((post, idx) => (
                <div key={idx}>
                  <Link to={`/postDetailPage/${post.id}`}>
                    <CardPost el={post} key={idx} size="w-full h-[200px]" />
                  </Link>
                </div>
              ))}
          </div>

          {showModalSuccess && (
            <ModalSuccess urlPath={`/postDetailPage/${postId}`} />
          )}
          {showModalDeleteSuccess && <ModalSuccess urlPath={"/"} />}

          {showModalDeleteComment && (
            <ModalConfirmSave
              isVisible={showModalDeleteComment}
              onClose={() => setShowModalDeleteComment(false)}
              onSave={handleClickDeleteComment}
              header="ลบคอมเมนต์"
              text='คุณต้องการ "ลบคอมเมนต์" หรือไม่'
            />
          )}

          {showModalDeletePost && (
            <ModalConfirmSave
              isVisible={showModalDeletePost}
              onClose={() => setShowModalDeletePost(false)}
              onSave={handleClickDeletePost}
              header="Delete post"
              text='Do you want to "delete post"?'
            />
          )}
        </div>
      </div>
    </div>
  );
}
