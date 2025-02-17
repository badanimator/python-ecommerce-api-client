import { createContext, useContext, useEffect, useState } from "react";
import WithAxios from "../helpers/WithAxios";
import { useQuery } from "@tanstack/react-query";
import authService from "../api/services/auth.service";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [authData, setAuthData] = useState({token: "",});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userData = useQuery({
    enabled:isLoggedIn,
    refetchOnWindowFocus:false,
    queryKey:['profile', isLoggedIn],
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

  const setUserInfo = (data) => {
    const { token } = data;
    setIsLoggedIn(true);
    setAuthData({token,});
    localStorage.setItem("token", JSON.stringify(token));
  };

  const logout = () => {
    setIsLoggedIn(false);
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
        authData,
        setAuthData,
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
