import { useEffect, useRef, useState } from "react";
import { auth, database } from "../configs";

const useUserList = () => {
  const [usersList, setUsersList] = useState([]);
  const isMounted = useRef(false);
  const addNewUser = async (user) => {
    try {
      if (!auth?.currentUser?.uid) return;
      await database.ref(`UsersList/${auth?.currentUser?.uid}`).push(user);
    } catch (error) {}
  };
  const updateUserData = async (updatedUserData) => {
    try {
      const dbRef = `UsersList/${auth?.currentUser?.uid}/${updatedUserData?.key}`;
      await database.ref(dbRef).set(updatedUserData);
    } catch (error) {}
  };
  const deleteUserData = async (key) => {
    try {
      const dbRef = `UsersList/${auth?.currentUser?.uid}/${key}`;
      await database.ref(dbRef).remove();
    } catch (error) {}
  };
  const fetchUsersList = async () => {
    try {
      const dbRef = `UsersList/${auth?.currentUser?.uid}`;
      await database.ref(dbRef).on("value", (snap) => {
        const arr = [];
        if (snap.exists()) {
          const userListObj = snap.val();
          for (const key in userListObj) {
            arr.push({ ...userListObj[key], key });
          }
        } else {
          isMounted.current && setUsersList(arr);
        }
        isMounted.current && setUsersList(arr);
      });
    } catch (error) {}
  };
  useEffect(() => {
    isMounted.current = true;
    fetchUsersList();
    return () => (isMounted.current = false);
  }, []);
  return { usersList, addNewUser, updateUserData, deleteUserData };
};

export default useUserList;
