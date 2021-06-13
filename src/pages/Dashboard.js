import MaterialTable from "material-table";
import { IconButton, makeStyles, Card, CardHeader } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { useAppContext, useUserList } from "../hooks";
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
  const {
    addNewUser,
    usersList,
    deleteUserData,
    updateUserData,
  } = useUserList();
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
                      addNewUser(newData);
                      setShowAlert({
                        msg: "User Data Added To The List Successfully",
                        isOpen: true,
                        color: "success",
                      });
                    } else {
                      setShowAlert({
                        msg:
                          "Provide all the correct details of user for creating new user",
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
                      updateUserData(newData);
                    } else {
                      setShowAlert({
                        msg:
                          "Please Fill All fields correctly before saving user data",
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
                    deleteUserData(oldData?.key);
                    setShowAlert({
                      msg: "User Data Deleted Successfully",
                      isOpen: true,
                      color: "success",
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
