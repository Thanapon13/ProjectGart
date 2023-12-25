import { createContext, useEffect, useState } from "react";
import { getRestoredData } from "../apis/admin-api";

export const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
  const [restoredData, setRestoredData] = useState([]);
  // console.log("restoredData:", restoredData);

  useEffect(() => {
    const fetchRestoredData = async () => {
      const res = await getRestoredData();
      //   console.log("res:", res.data.historyPost);
      setRestoredData(res?.data?.historyPost);
    };
    fetchRestoredData();
  }, []);

  return (
    <AdminContext.Provider value={{ restoredData, setRestoredData }}>
      {children}
    </AdminContext.Provider>
  );
}
