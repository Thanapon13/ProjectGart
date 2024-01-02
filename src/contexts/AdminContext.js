import { createContext, useEffect, useState } from "react";
import { getRestoredData, getComment } from "../apis/admin-api";

export const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
  const [restoredData, setRestoredData] = useState([]);
  // console.log("restoredData:", restoredData);

  const [commentData, setCommentData] = useState([]);
  // console.log("commentData:", commentData);

  useEffect(() => {
    const fetchRestoredData = async () => {
      const res = await getRestoredData();
      //   console.log("res:", res.data.historyPost);
      setRestoredData(res?.data?.historyPost);
    };
    fetchRestoredData();
  }, []);

  useEffect(() => {
    const fetchCommentData = async () => {
      const res = await getComment();
      //   console.log("res:", res.data.historyPost);
      setCommentData(res?.data?.comments);
    };
    fetchCommentData();
  }, []);

  return (
    <AdminContext.Provider
      value={{ restoredData, setRestoredData, commentData, setCommentData }}
    >
      {children}
    </AdminContext.Provider>
  );
}
