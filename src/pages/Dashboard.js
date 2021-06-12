import MaterialTable from "material-table";
import { IconButton, makeStyles, Card, CardHeader } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { useAppContext } from "../hooks";
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
  const { setIsLoggedIn, data, setData, setShowAlert } = useAppContext();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedInBefore");
    setIsLoggedIn(false);
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
            data={data}
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
                      setData([...data, newData]);
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
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    if (
                      newData?.name &&
                      newData?.age &&
                      newData?.gender &&
                      newData?.password
                    ) {
                      setData([...dataUpdate]);
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
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);
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
