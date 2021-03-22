import { createContext, useState, useEffect } from "react";
import { auth, getUser } from "../firebase";
import firebase from "firebase/app";
import { ToastContainer, toast } from 'react-toastify';


export const UserContext = createContext();


export const UserProvider = ({ children }) => {

    const [user, setUser] = useState()

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            setUser( user)
            console.log('logueado')
          // User is signed in.
        } else {
            setUser(false)// No user is signed in.
          console.log('sin user')
        }
      });
    
  


    const createNewUserWithEmailAndPassword = (email,pass) => {

        const userCredentials =  auth
            .createUserWithEmailAndPassword(email,pass)

        return userCredentials
    }


      
    const logInUser = (email,pass) => {
        const user = auth.signInWithEmailAndPassword(email,pass)
        return user
    }

    const logOutUser = () => {
        const notify = () => toast.success("Has cerrado sesión!", {
            autoClose: false,
            position: "top-right",
          });

        auth.signOut().then(notify)
        
        setUser(false)
    }
    

    return (
        <UserContext.Provider value={{ logInUser, createNewUserWithEmailAndPassword , user, logOutUser}}>
            {children}
        </UserContext.Provider>
    )
}