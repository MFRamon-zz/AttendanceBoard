import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAyq72XN4yce1c23BDFd2dUKe8RQ3LrAzE",
  authDomain: "ipuerk-dev.firebaseapp.com",
  databaseURL: "https://ipuerk-dev.firebaseio.com",
  projectId: "ipuerk-dev",
  storageBucket: "ipuerk-dev.appspot.com",
  messagingSenderId: "715582567067",
  appId: "1:715582567067:web:d6530664c2ceba114f8c3e"
});

export default app;
