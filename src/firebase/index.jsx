import firebase from "firebase/app";
import "@firebase/firestore";
import '@firebase/storage';
import "@firebase/auth";
import {useState} from 'react'


const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_DB_FB_apiKey,
  authDomain: process.env.REACT_APP_DB_FB_authDomain,
  projectId: process.env.REACT_APP_DB_FB_projectId,
  storageBucket: process.env.REACT_APP_DB_FB_storageBucket,
  messagingSenderId: process.env.REACT_APP_DB_FB_messagingSenderId,
  appId: process.env.REACT_APP_DB_FB_appId,
  measurementId: process.env.REACT_APP_DB_FB_measurementId,
})

  
export const auth = firebase.auth()


export function getFirebase() {
  return app
}

export function getFirestore() {
  return firebase.firestore(app)
}

export function getFireStorage() {
  return firebase.storage();
}

export function getUser() {
  return firebase.auth().currentUser;
}


