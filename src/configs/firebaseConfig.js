import firebase from "firebase";
// Import Firebase Auth Module
import "firebase/auth";
// Import database from the Firebase
import "firebase/database";
// Import firestore from the Firebase
import "firebase/firestore";
// Import storage from the Firebase
import "firebase/storage";
// Import analytics from the Firebase
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBM12QNpOOpTK7UVvqovNGhHDYyIQE5Vvk",
  authDomain: "firecrud-aa9ec.firebaseapp.com",
  databaseURL: "https://firecrud-aa9ec.firebaseio.com",
  projectId: "firecrud-aa9ec",
  storageBucket: "firecrud-aa9ec.appspot.com",
  messagingSenderId: "513744767392",
  appId: "1:513744767392:web:119d789ef9679bdf6cbcc5",
  measurementId: "G-KZSM3EL0N6",
};

// Configure FirebaseUI.
export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // signInSuccessUrl: "/",
  // Add auth providers.
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    },
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      defaultCountry: "IN",
    },
  ],
};

// NOTE Initialize the app
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

export const database = app.database();

export const firestore = app.firestore();

export const storage = app.storage();

export const analytics = app.analytics();

export default app;
