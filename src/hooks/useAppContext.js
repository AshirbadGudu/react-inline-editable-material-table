import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  const [showAlert, setShowAlert] = useState({
    msg: "",
    isOpen: false,
    color: "",
  });
  useEffect(() => {
    localStorage.setItem("email", "admin@gmail.com");
    localStorage.setItem("password", "admin@gmail.com");
    const isLoggedInBefore = localStorage.getItem("isLoggedInBefore");
    setIsLoggedIn(isLoggedInBefore);
    return () => {};
  }, []);
  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        data,
        setData,
        showAlert,
        setShowAlert,
      }}
    >
      <Snackbar
        open={showAlert.isOpen}
        autoHideDuration={6000}
        onClose={() => setShowAlert({ msg: "", isOpen: false, color: "" })}
      >
        <Alert
          onClose={() =>
            setShowAlert({ msg: "", isOpen: false, color: "error" })
          }
          severity={showAlert.color}
        >
          {showAlert.msg}
        </Alert>
      </Snackbar>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    data,
    setData,
    showAlert,
    setShowAlert,
  } = useContext(AppContext);
  return { isLoggedIn, setIsLoggedIn, data, setData, showAlert, setShowAlert };
};

export default useAppContext;
