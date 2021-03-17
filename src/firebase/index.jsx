  import firebase from "firebase/app";
  import "@firebase/firestore";
  import '@firebase/storage';
  
  const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_DB_FB_apiKey,
    authDomain: process.env.REACT_APP_DB_FB_authDomain,
    projectId: process.env.REACT_APP_DB_FB_projectId,
    storageBucket: process.env.REACT_APP_DB_FB_storageBucket,
    messagingSenderId: process.env.REACT_APP_DB_FB_messagingSenderId,
    appId: process.env.REACT_APP_DB_FB_appId,
    measurementId: process.env.REACT_APP_DB_FB_measurementId,
  })


  export function getFirebase() {
      return app
  }

  export function getFirestore() {
      return firebase.firestore(app)
  }

  export function getFireStorage() {
    // firebase.initializeApp(app);
    // var storage = firebase.storage().ref();
    return firebase.storage();
  }