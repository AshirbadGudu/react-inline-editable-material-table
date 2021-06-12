import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    localStorage.setItem("email", "admin@gmail.com");
    localStorage.setItem("password", "admin@gmail.com");
    return () => {};
  }, []);
  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  return { isLoggedIn, setIsLoggedIn };
};

export default useAppContext;
