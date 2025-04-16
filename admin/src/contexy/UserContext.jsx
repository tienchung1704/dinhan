import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);
const url = "http://localhost:4000";
const UserContextProvider = (props) => {
  const [list, setList] = useState({});
  const fetchList = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    const response = await axios.get(url + "/api/admin/list", {
      headers: {
        userId: userId,
      },
    });
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };
  const logout = async () => {
    setList({});
    toast.success("Logged out successfully!");
  };
  const handleLogin = async () => {
    await fetchList();
  };
  useEffect(() => {
    handleLogin();
  }, []);

  const contextValue = {
    fetchList,
    list,
    setList,
    logout,
    handleLogin,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default UserContextProvider;
