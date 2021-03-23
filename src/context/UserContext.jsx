import { createContext, useState, useEffect } from "react";
import { auth, getUser } from "../firebase";
import firebase from "firebase/app";
import { ToastContainer, toast } from 'react-toastify';



export const UserContext = createContext();


export const UserProvider = ({ children }) => {

    const [user, setUser] = useState()
    const [logout, setLogout] = useState(false)


    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            setUser( user)

        } else {
            // No user is signed in.
            setUser(false)  

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
            // autoClose: false,
            position: "top-right",
        });

        toast.onChange((numberOfToastDisplayed) => {
            numberOfToastDisplayed == 0 &&  window.location.replace('/')
        });


        auth.signOut().then(  notify
        )
        setUser(false)
        setLogout(true)
        
        

        
        
    }
    

    return (
        <UserContext.Provider value={{ logInUser, createNewUserWithEmailAndPassword , user, logOutUser, logout}}>
            {children}
        </UserContext.Provider>
    )
}