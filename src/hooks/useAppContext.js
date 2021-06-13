import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../configs";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  const [showAlert, setShowAlert] = useState({
    msg: "",
    isOpen: false,
    color: "",
  });
  const logout = () => auth.signOut();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return unsubscribe;
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
        logout,
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
    logout,
  } = useContext(AppContext);
  return {
    isLoggedIn,
    setIsLoggedIn,
    data,
    setData,
    showAlert,
    setShowAlert,
    logout,
  };
};

export default useAppContext;
