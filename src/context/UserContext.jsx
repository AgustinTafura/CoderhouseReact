import { createContext, useState, useEffect } from "react";
import { auth, getUser } from "../firebase";
import firebase from "firebase/app";
import { ToastContainer, toast } from 'react-toastify';



export const UserContext = createContext();


export const UserProvider = ({ props, children }) => {

    const [user, setUser] = useState()


    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // console.log(11, user)
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

    const logInWhitGoogle = ()=> {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then((result) => {
            console.log(result)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const logInWhitFacebook = ()=> {
        const provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(provider).then((result) => {

        })
        .catch(err => {
            console.log(err);
        })
    }

    const logOutUser = () => {
        const notify = () => toast.success("Has cerrado sesión!", {
            // autoClose: false,
            position: "top-right",
        });

        // toast.onChange((numberOfToastDisplayed) => {
        //     numberOfToastDisplayed == 0 &&  window.location.replace('/')
        // });


        auth.signOut().then( 
            setTimeout(() => {
                notify()
            }, 1500) 
        )
        setUser(false)

        
        

        
        
    }
    

    return (
        <UserContext.Provider value={{ logInUser, logInWhitGoogle, logInWhitFacebook, createNewUserWithEmailAndPassword , user, logOutUser}}>
            {children}
        </UserContext.Provider>
    )
}