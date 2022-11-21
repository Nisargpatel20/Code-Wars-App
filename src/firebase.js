import firebase from "firebase/compat/app";

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// require('firebase/auth');


const firebaseConfig = {
    apiKey: "AIzaSyAMURwJwjTMZBGTDoe74BYsscb_kV7EjZc",
    authDomain: "social-media-app-228e0.firebaseapp.com",
    projectId: "social-media-app-228e0",
    storageBucket: "social-media-app-228e0.appspot.com",
    messagingSenderId: "270236483156",
    appId: "1:270236483156:web:a4d142171126345eac77c1",
    measurementId: "G-W9ZFMWDRB9",
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db  = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const storage = firebaseApp.storage();
  const provider = new firebase.default.auth.GoogleAuthProvider();

  export { db, auth, provider, storage};