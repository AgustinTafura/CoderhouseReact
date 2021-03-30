import { createContext, useEffect, useState, } from "react";
import { auth } from "../firebase";
import firebase from "firebase/app";
import { toast } from 'react-toastify';



export const UserContext = createContext();




export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false) 

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {

            if (user) {
                setUser( user)
                setIsAuthenticated(true)
                // console.log(user)
            } else {
                // No user is signed in.
                setUser(false)  
                setIsAuthenticated(false)
                // console.log(user)
            }
    
        });
        //auth listener (keep the user alive)
    }, [])
      
    const createNewUserWithEmailAndPassword = (email,pass) => {

        const userCredentials =  auth
            .createUserWithEmailAndPassword(email,pass)
            .then(
                 (data)=>{
                    console.log(data.user)
                    const user =  data.user
                   
                    user.sendEmailVerification().then(function(a) {
                        toast.info("Ingresa a tu email y verifica tu cuenta!", {
                            // autoClose: false,
                            position: "top-right",
                        });

                        console.log('Email sent.', a)
                    }).catch(function(error) {
                        console.log('An error happened.', error)
                    });
                
                }
            ).catch(
                (error)=> {
                    toast.error("No hemos podido crear tu cuenta, intentalo nuevamente!", {
                        // autoClose: false,
                        position: "top-right",
                    });
                console.log('no se creo el user', error)
            })
            
        return userCredentials
    }

    const logInUser = (email,pass) => {
        const user = auth.signInWithEmailAndPassword(email,pass)
        setIsAuthenticated(true)
        
        return user
    }

    const logInWhitGoogle = ()=> {

        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then((user) => {
            setIsAuthenticated(true)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const logInWhitFacebook = ()=> {
        const provider = new firebase.auth.FacebookAuthProvider();
        return auth.signInWithPopup(provider).then((user) => {
            setUser(user)
            setIsAuthenticated(true)
        })
        .catch(err => {
            console.log(err)
        })


    }

    const logOutUser = () => {
        const notify = () => toast.success("Has cerrado sesión!", {
            // autoClose: false,
            position: "top-right",
        });

        auth.signOut().then( 
            setTimeout(() => {
                notify()
            }, 1500) 
        )

        setIsAuthenticated(false)
        
        
        
    }
    


    return (
        <UserContext.Provider value={{ logInUser, logInWhitGoogle, logInWhitFacebook, createNewUserWithEmailAndPassword , user, logOutUser, isAuthenticated}}>
            {children}
        </UserContext.Provider>
    )
}

