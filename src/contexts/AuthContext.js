import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { login, getMe } from "../apis/auth-api";
import {
  updateProfile,
  getUserInfoById,
  usersData,
  getUserDatas
} from "../apis/user-api";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken
} from "../utils/local-storage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authenticateUser, setAuthenticatedUser] = useState(
    getAccessToken() ? true : null
  );
  // console.log("authenticateUser", authenticateUser);

  const [getUserData, setGetUserData] = useState([]);
  // console.log("getUserData:", getUserData);

  const [getUsers, setGetUsers] = useState([]);
  // console.log("getUsers:", getUsers);

  const [userDatas, setUserDatas] = useState([]);

  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await getMe();
        setAuthenticatedUser(res.data.user);
      } catch (err) {
        removeAccessToken();
      }
    };
    if (getAccessToken) {
      fetchAuthUser();
    }
  }, []);

  useEffect(() => {
    const fetchUserDatas = async () => {
      try {
        const res = await getUserDatas();
        // console.log("getUserDatas", res.data.pureUsersData);
        setUserDatas(res.data.pureUsersData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserDatas();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await usersData();
        // console.log("getMe", res);
        setGetUsers(res.data.pureUsersData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUserInfoById = async () => {
      try {
        let userIdToFetch;

        if (selectedProfileId) {
          userIdToFetch = selectedProfileId;
        } else if (authenticateUser && authenticateUser.id) {
          userIdToFetch = authenticateUser.id;
        } else {
          console.error(
            "Neither selectedProfileId nor authenticateUser is available"
          );
          return;
        }

        const res = await getUserInfoById(userIdToFetch);
        // Update getUserData based on the response
        setGetUserData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserInfoById();
  }, [authenticateUser, selectedProfileId]);

  const refreshUserData = async () => {
    try {
      setIsLoading(true);
      if (authenticateUser && authenticateUser.id) {
        const res = await getUserInfoById(authenticateUser.id);
        setGetUserData(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const userLogin = async (email, password) => {
    const res = await login({ email, password });
    setAccessToken(res.data.accessToken);
    setAuthenticatedUser(jwtDecode(res.data.accessToken));
  };

  const logout = () => {
    removeAccessToken();
    setAuthenticatedUser(null);
  };

  // const userUpdateProfile = async data => {
  //   const res = await updateProfile(data);
  //   setAuthenticatedUser({ ...authenticateUser, ...res.data });
  // };

  const userUpdateProfile = async data => {
    try {
      const res = await updateProfile(data);
      const updatedUser = { ...authenticateUser, ...res.data };
      setAuthenticatedUser(updatedUser);
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticateUser,
        userLogin,
        logout,
        userUpdateProfile,
        setAuthenticatedUser,
        getMe,
        getUserData,
        setGetUserData,
        refreshUserData,
        getUsers,
        setGetUsers,
        setSelectedProfileId,
        selectedProfileId,
        userDatas
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
