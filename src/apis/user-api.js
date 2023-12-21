import axios from "../config/axios";

export const updateProfile = formData => axios.patch("/user", formData);

export const updatecoverImage = formData =>
  axios.patch("/user/coverImage", formData);

export const usersData = () => axios.get("/user/users");
export const updateUserInfo = input => axios.patch("/user/info", input);

export const updateUserInfoPassword = input =>
  axios.patch("/user/infoPassword", input);

export const getUserDatas = () => axios.get("/user/users");

export const getUserInfoById = userId => axios.get(`/user/${userId}`);
