import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
} from "@material-ui/core";
import { auth, uiConfig } from "../configs";
const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "95%",
    },
  },
  inputSpacing: {
    marginBottom: 15,
  },
  cover: {
    width: 250,
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.formWrapper}>
        <Card className={classes.cardWrapper}>
          <CardMedia
            className={classes.cover}
            image="https://image.freepik.com/free-vector/log-into-several-devices-responsive-app-design-wifi-zone-gadgets-online-communication-social-networking-web-connection-initialize-sign-up-vector-isolated-concept-metaphor-illustration_335657-1999.jpg"
            title="Login Image"
          />
          <CardContent>
            <CardHeader title="Login To Access Panel" />
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
