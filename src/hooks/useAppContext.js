import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([
    {
      name: "user@gmail.com",
      password: "user@password",
      age: 18,
      gender: 2,
    },
    {
      name: "seconduser@gmail.com",
      password: "seconduser@password",
      age: 21,
      gender: 1,
    },
  ]);
  useEffect(() => {
    localStorage.setItem("email", "admin@gmail.com");
    localStorage.setItem("password", "admin@gmail.com");
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
