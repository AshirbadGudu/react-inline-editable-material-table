import { useState } from "react";
import {
  IconButton,
  InputAdornment,
  makeStyles,
  Snackbar,
  OutlinedInput,
  TextField,
  Card,
  CardContent,
  Button,
  CardHeader,
  CardMedia,
} from "@material-ui/core";
import {
  Email,
  ExitToApp,
  LockSharp,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { useAppContext } from "../hooks";
import { Alert } from "@material-ui/lab";
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
    display: "flex",
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  const { setIsLoggedIn } = useAppContext();

  return (
    <>
      <div className={classes.pageWrapper}>
        <Card>
          <CardHeader
            title="Dashboard"
            action={
              <IconButton
                aria-label="logout"
                onClick={() => setIsLoggedIn(false)}
              >
                <ExitToApp />
              </IconButton>
            }
          />
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
