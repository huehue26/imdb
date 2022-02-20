import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

// const app = firebase.initializeApp({
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDERID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASURMENT_ID
// });

// console.log(process.env.FIREBASE_API_KEY)
// const x = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDERID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASURMENT_ID
// };
// const app = firebase.initializeApp(x)
// console.log(x);

const app = firebase.initializeApp({
  apiKey: "AIzaSyCEHGtH-wOr0PPt8oKSe7iP7u8JEl4TzKA",
  authDomain: "imdb-bd948.firebaseapp.com",
  projectId: "imdb-bd948",
  storageBucket: "imdb-bd948.appspot.com",
  messagingSenderId: "780788773933",
  appId: "1:780788773933:web:2c4b0129faeab3e88f34a4",
  measurementId: "G-HWK2B1LYNV",
});

export const auth = app.auth();
export const googleAuth = new firebase.auth.GoogleAuthProvider();
export const facebookAuth = new firebase.auth.FacebookAuthProvider();
export const githubAuth = new firebase.auth.GithubAuthProvider();
export const db = getFirestore();
