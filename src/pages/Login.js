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
  LockSharp,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { useAppContext } from "../hooks";
import { Alert } from "@material-ui/lab";
const useStyles = makeStyles(() => ({
  formWrapper: {
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
  inputSpacing: {
    marginBottom: 15,
  },
  cover: {
    width: "100%",
  },
}));

const Login = () => {
  const { setIsLoggedIn } = useAppContext();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState({
    msg: "",
    isOpen: false,
    color: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      const adminEmail = localStorage.getItem("email");
      const adminPassword = localStorage.getItem("password");
      if (adminEmail !== email) {
        setShowAlert({
          msg: "This Email don't have access to admin panel",
          isOpen: true,
          color: "error",
        });
        return;
      }
      if (adminPassword !== password) {
        setShowAlert({
          msg: "Please enter right password",
          isOpen: true,
          color: "error",
        });
        return;
      }
      if (adminEmail === email && adminPassword === password) {
        localStorage.setItem("isLoggedInBefore", true);
        setIsLoggedIn(true);
      }
    } catch (error) {}
  };
  return (
    <>
      <Snackbar
        open={showAlert.isOpen}
        autoHideDuration={6000}
        onClose={() => setShowAlert({ msg: "", isOpen: false, color: "" })}
      >
        <Alert
          onClose={() => setShowAlert({ msg: "", isOpen: false, color: "" })}
          severity={showAlert.color}
        >
          {showAlert.msg}
        </Alert>
      </Snackbar>
      <form onSubmit={onSubmit} className={classes.formWrapper}>
        <Card className={classes.cardWrapper}>
          <CardMedia
            className={classes.cover}
            image="https://image.freepik.com/free-vector/log-into-several-devices-responsive-app-design-wifi-zone-gadgets-online-communication-social-networking-web-connection-initialize-sign-up-vector-isolated-concept-metaphor-illustration_335657-1999.jpg"
            title="Login Image"
          />
          <CardContent>
            <CardHeader title="Login To Access Panel" />
            <TextField
              variant="outlined"
              required
              fullWidth
              placeholder="Enter Your Email"
              name="email"
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={classes.inputSpacing}
            />
            <OutlinedInput
              name="password"
              autoComplete="password"
              variant="outlined"
              placeholder="Enter Your Password"
              required
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <LockSharp />
                </InputAdornment>
              }
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              className={classes.inputSpacing}
            />
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default Login;
