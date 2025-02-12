import { createContext, useContext, useEffect, useState } from "react";
import WithAxios from "../helpers/WithAxios";
import { useQuery } from "@tanstack/react-query";
import authRoutes from "../routes/AuthRoutes";
import API from "../api/axios.config";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [authData, setAuthData] = useState({token: "",});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userData = useQuery({
    enabled:isLoggedIn,
    refetchOnWindowFocus:false,
    queryKey:['user_details', isLoggedIn],
    queryFn:()=> authService.getCurrentUser().then((res) => {
      return res.data
    })
  });
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setAuthData(JSON.parse(localStorage.getItem("token")));
    }
  }, []);



  const updateUserData = async ({ fullname, email, username, address, city, state, country }) => {
    const res = await API.put(`/users/${userData.user_id}`, {
      fullname,
      email,
      username,
      address,
      city,
      state,
      country,
    });
  };

  const setUserInfo = (data) => {
    const { token, admin } = data;
    setIsLoggedIn(true);
    setIsAdmin(admin);
    setIsUser(!admin);
    setAuthData({token,});
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("isAdmin", JSON.stringify(admin));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsUser(false);
    setAuthData(null);
    authService.logout();
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserState: (data) => setUserInfo(data),
        logout,
        isLoggedIn,
        setIsLoggedIn,
        isAdmin,
        setIsAdmin,
        isUser, 
        setIsUser,
        authData,
        setAuthData,
        updateUserData,
      }}
    >
      <WithAxios>{children}</WithAxios>
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
