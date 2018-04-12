import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC9cdMllN5HRIp0Qa1x4LbPOVc8aUiadlk",
  authDomain: "catch-of-the-day-vishal-matam.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-vishal-matam.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

//This is a named export
export { firebaseApp };

//This is a default export
export default base;
