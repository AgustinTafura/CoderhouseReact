  import firebase from "firebase/app";
  import "@firebase/firestore";
  import '@firebase/storage';
  
  const app = firebase.initializeApp({
    apiKey: "AIzaSyDfhLdHOQCC_ILPdsN033J75tKCvIweImE",
    authDomain: "jpl-nutricion.firebaseapp.com",
    projectId: "jpl-nutricion",
    storageBucket: "jpl-nutricion.appspot.com",
    messagingSenderId: "715865958241",
    appId: "1:715865958241:web:cb90b59fea1d1f44764720",
    measurementId: "G-SGQ7VF9ESC"
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