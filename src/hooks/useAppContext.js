import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    localStorage.setItem("email", "admin@gmail.com");
    localStorage.setItem("password", "admin@gmail.com");
    const isLoggedInBefore = localStorage.getItem("isLoggedInBefore");
    setIsLoggedIn(isLoggedInBefore);
    return () => {};
  }, []);
  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const { isLoggedIn, setIsLoggedIn, data, setData } = useContext(AppContext);
  return { isLoggedIn, setIsLoggedIn, data, setData };
};

export default useAppContext;
