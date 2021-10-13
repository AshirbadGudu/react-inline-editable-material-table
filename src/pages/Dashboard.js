import MaterialTable from "material-table";
import {
  IconButton,
  makeStyles,
  Card,
  CardHeader,
  Avatar,
} from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { useAppContext, useUserList } from "../hooks";
import { storage, firestore } from "../configs";
import { useEffect } from "react";

const useStyles = makeStyles(() => ({
  pageWrapper: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
  },
  cardWrapper: {
    minWidth: "65%",
    maxWidth: "95%",
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  const { logout, setShowAlert } = useAppContext();
  const { addNewUser, usersList, deleteUserData, updateUserData } =
    useUserList();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      setShowAlert({
        msg: error.message,
        isOpen: true,
        color: "error",
      });
    }
  };

  useEffect(() => {
    // firestore.collection("users").doc("uid").set({
    //   displayName: "Nani",
    // });
    return () => {};
  }, []);

  return (
    <>
      <div className={classes.pageWrapper}>
        <Card className={classes.cardWrapper}>
          <CardHeader
            title="Dashboard"
            action={
              <IconButton aria-label="logout" onClick={handleLogout}>
                <ExitToApp />
              </IconButton>
            }
          />
          <MaterialTable
            options={{
              actionsColumnIndex: -1,
              exportButton: true,
              // filtering: true,
              // grouping: true,
              // selection: true,
            }}
            columns={[
              {
                title: "User Photo",
                field: "photoURL",
                render: ({ photoURL }) => {
                  return <Avatar src={photoURL} alt="" />;
                },
                editComponent: ({ value, onChange }) => {
                  return (
                    <>
                      <Avatar
                        src={
                          value?.target?.files[0]
                            ? URL.createObjectURL(value?.target?.files[0])
                            : value ||
                              "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                        }
                        alt=""
                      />
                      <input type="file" onChange={onChange} />
                    </>
                  );
                },
              },
              {
                title: "User Name",
                field: "name",
              },
              { title: "User Password", field: "password" },
              { title: "User Age", field: "age", type: "numeric" },
              {
                title: "User Gender",
                field: "gender",
                lookup: { 1: "Male", 2: "Female" },
              },
            ]}
            data={usersList}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if (
                      newData?.name &&
                      newData?.age &&
                      newData?.gender &&
                      newData?.password
                    ) {
                      const file = newData?.photoURL?.target?.files?.[0];
                      const fileRef = `Users/${new Date().getTime()}`;
                      storage
                        .ref(fileRef)
                        .put(file)
                        .then((res) => {
                          res.ref.getDownloadURL().then((url) => {
                            addNewUser({ ...newData, fileRef, photoURL: url });
                            setShowAlert({
                              msg: "User Data Added To The List Successfully",
                              isOpen: true,
                              color: "success",
                            });
                          });
                        });
                    } else {
                      setShowAlert({
                        msg: "Provide all the correct details of user for creating new user",
                        isOpen: true,
                        color: "error",
                      });
                    }
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if (
                      newData?.name &&
                      newData?.age &&
                      newData?.gender &&
                      newData?.password
                    ) {
                      const file = newData?.photoURL?.target?.files?.[0];
                      const fileRef = newData?.fileRef;

                      if (file) {
                        storage
                          .ref(fileRef)
                          .put(file)
                          .then((res) => {
                            res.ref.getDownloadURL().then((url) => {
                              updateUserData({
                                ...newData,
                                fileRef,
                                photoURL: url,
                              });
                            });
                          });
                      } else {
                        updateUserData(newData);
                      }
                    } else {
                      setShowAlert({
                        msg: "Please Fill All fields correctly before saving user data",
                        isOpen: true,
                        color: "error",
                      });
                    }
                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const fileRef = oldData?.fileRef;
                    console.log(fileRef);
                    storage
                      .ref(fileRef)
                      .delete()
                      .then(() => {
                        deleteUserData(oldData?.key);
                        setShowAlert({
                          msg: "User Data Deleted Successfully",
                          isOpen: true,
                          color: "success",
                        });
                      });
                    resolve();
                  }, 1000);
                }),
            }}
            title="All Users List"
          />
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
