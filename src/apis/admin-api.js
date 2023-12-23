import axios from "../config/axios";

export const deleteTag = tagId => axios.delete(`/admin/tag/${tagId}`);

export const deletePost = input => {
  axios
    .delete(`/admin/post/${input.id}`, {
      data: {
        userId: input.userId,
        tagId: input.tagId
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
};

export const deleteUser = userId => axios.delete(`/admin/user/${userId}`);

export const getRestoredData = () => axios.get("/admin/historyPost");

export const restoredPost = (adminHistoryRestoreId, value) =>
  axios.post(`/admin/restoredPost/${adminHistoryRestoreId}`, value);

export const deleteRestoredPost = adminHistoryRestoreId =>
  axios.delete(`/admin/deleteRestoredPost/${adminHistoryRestoreId}`);

export const updateStatusPostHidePost = postId =>
  axios.post(`/admin/post/updateStatusPostHidePost/${postId}/`);

export const updateStatusPostShowPost = postId =>
  axios.post(`/admin/post/updateStatusPostShowPost/${postId}/`);

export const updateStatusBanUser = userId =>
  axios.post(`/admin"/user/updateStatusBanUser/${userId}`);

export const updateStatusShowUser = (userId, countdown) => {
  console.log("countdownAPI:", countdown);
  console.log("userIdAPI:", userId);
  return axios.post(`/admin/user/updateStatusShowUser/${userId}/${countdown}`);
};
